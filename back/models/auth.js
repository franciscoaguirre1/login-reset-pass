const mysql = require("../utils/mysql-pool.js")
require('dotenv').config()
const fs = require("fs")
const moment = require("moment")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const config = JSON.parse(fs.readFileSync('./config.json'))





exports.login = async (req, res) => {

    if(!req.body.username || !req.body.pass){
        const data = {
            data: null,
            sqlMsg: "",
            resMsg: 'Usuario y Contraseña son obligatorios'
        }
        res.status(400).send(data)
        return;
    }
    const {username, pass} = req.body;
    const conn = await mysql.connection()
    try {
        const db_user = await conn.query(`CALL SP_BANCO_OBTENER_USUARIO_LOGIN(?)`, [username])
        if(db_user[0].length == 0){
            const data = {
                data: null,
                sqlMsg: "",
                resMsg: 'El Usuario no se encuentra registrado'
            }
            res.status(400).send(data)
            return;
        }
        const hash = db_user[0][0].USUARIO_PASS
        bcrypt.compare(pass, hash, function(err, result) {
            if (result == true) {
                const privateKey = config.KEY_APP
                const jwtoken = jwt.sign({
                    user_id: db_user[0][0].USUARIO_ID,
                    user_name: db_user[0][0].USUARIO_USERNAME,
                    tipo_usuario: db_user[0][0].USUARIO_TIPO_USUARIO_ID,
                    usuario_pass: db_user[0][0].USUARIO_PASS,
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
