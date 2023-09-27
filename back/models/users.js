/////////////// CONTROLADOR


const mysql = require("../utils/mysql-pool.js")
const bcrypt = require('bcrypt')
const saltRounds = 10



exports.crearUsuario = async (req, res) => {
    
    const {nombre, apellido, email, nombreUsuario, password, password2} = req.body
    
    if(!nombre || !apellido || !email || !nombreUsuario || !password || !password2){
        const data = {
            data: null,
            sqlMsg: "",
            resMsg: "El nombre de usuario, contraseña y CUIL son obligatorios"
        }
        res.status(400).send(data)
    } 

    else if (!password || password2 != password) {
        const data = {
            data: null,
            sqlMsg: "",
            resMsg: "Las constraseñas no coinciden"
        }
        res.status(400).send(data)
    } 
    else {
        const conn = await mysql.connection()
        try {
            bcrypt.hash(password, saltRounds, async function(err, hash) { 
                if (err) {
                    const data = {
                        data: null,
                        sqlMsg: "",
                        resMsg: `Error al hashear la pass ${err}`
                    }
                    console.log("este es err en la función crearUsuario2",err)
                    res.status(500).send(data)
                } else {
                    const result = await conn.query(`CALL SP_CREAR_USUARIO(?, ?, ?, ?, ?, @o_mesaje)`, 
                        [nombre, apellido, email, nombreUsuario, hash])
                        console.log("esto es result dentro del else", result);
                        if (result.affectedRows > 0) {
                            const data = {
                                data: null,
                                sqlMsg: 'Usuario creado con éxito',
                                resMsg: `Usuario creado con éxito`
                            }
                            res.status(200).send(data)
                        } else {
                            const data = {
                                data: null,
                                sqlMsg: 'No se pudo crear el usuario',
                                resMsg: 'No se pudo crear el usuario'
                            }
                            res.status(200).send(data)
                        }
    
                }
            })
    
                
        } catch (error) {
            const data = {
                data: null,
                sqlMsg: `Error al crear el usuario: ${error}`,
                resMsg: `Error al crear el usuario: ${error}`
            }
            res.status(500).send(data)
        } finally {
            conn.release()
        }
    }
    
}





