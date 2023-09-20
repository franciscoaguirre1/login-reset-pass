const express = require('express')
const cors = require('cors')
const tools = require('./utils/tools')
const fs = require('fs')

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = JSON.parse(fs.readFileSync('./config.json'))


const app = express()
app.use(cors())
app.use(express.json());

app.use(express.json({ limit: '500000000mb' }));
app.use(express.urlencoded({ extended: true,limit: '500000000mb', parameterLimit: 500000000 }));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

//Static files
app.use(express.static("../front/dist/front/"))


//Middlewares HTTP

app.use((req, res, next) => {
    if (req.url === '/api/v1/auth/login' || req.url === '/api/v1/auth/signup') {
        // Si la URL es para login o signup, permite la solicitud sin autenticación.
        next();
    } else if (!req.url.includes('/api/v1')) {
        // Si la URL no está bajo '/api/v1', permite la solicitud sin autenticación.
        next();
    } else {
        const token = tools.getBearerToken(req.headers.authorization);
        if (!token) {
            // Si no hay un token válido, devuelve una respuesta 401 (No autorizado).
            res.status(401).send();
        } else {
            try {
                const privateKey = config.KEY_APP;
                // Verifica el token utilizando la clave privada.
                jwt.verify(token, privateKey);
                next();
            } catch (err) {
                // Si el token es inválido, devuelve una respuesta 401 con un mensaje de error.
                res.status(401).send({ error: "Token inválido" });
            }
        }
    }
});


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