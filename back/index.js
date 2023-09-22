const express = require('express')
const cors = require('cors')
const tools = require('./utils/tools')
const fs = require('fs')

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = JSON.parse(fs.readFileSync('./config.json'))


const app = express()
app.use(cors())


app.use(express.json({ limit: '500000000mb' }));
app.use(express.urlencoded({ extended: true,limit: '500000000mb', parameterLimit: 500000000 }));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

//Static files
app.use(express.static("../front/dist/front/"))



app.use((req, res, next) => {
    if(req.url == '/api/v1/login' || req.url.includes('/api/v1/signup') || !req.url.includes('/api/v1') ){
        console.log("entro aca 1");
        next()
        return
    }
    const token = tools.getBearerToken(req.headers.authorization);
    if(!token){
        console.log("entro aca 2");
        res.status(401).send();
        return
    }
    try {
        console.log("entro aca 3");
        const privateKey = config.KEY_APP
        jwt.verify(token, privateKey)
        next()
    } catch(err) {
        console.log("entro aca 4");
        res.status(401).send({error: "Token inválido"})
        return
    }
})


/////ROUTES  A-Z///


const authRoutes = require('./routes/authRoutes')
app.use('/api/v1', authRoutes)


const usersRoutes = require('./routes/usersRoutes')
app.use('/api/v1', usersRoutes)



app.get('*', (req, res) => { 
    if(!req.url.includes("/api/v1")){
        res.sendFile("index.html", {root: "../front/dist/front/"}); 
    }
})