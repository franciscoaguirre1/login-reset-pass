const mysql = require("../utils/mysql-pool.js")
require('dotenv').config()
const fs = require("fs")
const moment = require("moment")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10


const config = JSON.parse(fs.readFileSync('./config.json'))
exports.login = async (req, res) => {
    console.log("este es req.body desde auth.js: ",req.body);
    if(!req.body.nombreUsuario || !req.body.password){
        const data = {
            data: null,
            sqlMsg: "",
            resMsg: 'Usuario y Contraseña son obligatorios'
        }
        res.status(400).send(data)
        return;
    }
    const {nombreUsuario, password} = req.body;
    const conn = await mysql.connection()
    try {
        const db_user = await conn.query(`CALL SP_OBTENER_USUARIO_LOGIN(?)`, [nombreUsuario, password])
        console.log("este es db_user",db_user);
        if(db_user[0][0].length == 0){
            const data = {
                data: null,
                sqlMsg: "",
                resMsg: 'El Usuario no se encuentra registrado'
            }
            res.status(400).send(data)
            return;
        }
        const hash = db_user[0][0].password
        console.log("este es hash",hash);
        console.log("este es password", password);
        bcrypt.compare(password, hash, function(err, result) {
            if (result == true) {
                console.log("entro aca si result es igual a true:", result);
                const privateKey = config.KEY_APP
                const jwtoken = jwt.sign({
                    user_id: db_user[0][0].id_usuario,
                    nombreUsuario: db_user[0][0].nombreUsuario,
                    password: db_user[0][0].password,
                    iat: parseFloat( moment().format("X") )
                }, privateKey)
                res.status(200).send({
                    access_token: jwtoken,
                })
                return;
            } 
            const data = {
                data: null,
                sqlMsg: "",
                resMsg: 'La contraseña es incorrecta'
            }
            res.status(400).send(data)
        });

    } catch (error) {
        console.log(error);
        const data = {
            data: null,
            sqlMsg: "",
            resMsg: 'error'
        }
        res.status(500).send(error)
    }
    finally{
        conn.release()
    }
};

