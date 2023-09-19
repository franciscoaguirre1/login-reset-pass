const mysql = require("../utils/mysql-pool.js")
const bcrypt = require('bcrypt')
const saltRounds = 10


exports.leerUsuarios = async (req, res) => {
    const conn = await mysql.connection()
    try {
        const result = await conn.query(`CALL SP_BANCO_OBTENER_USUARIOS()`)
        const usuarios = result[0];
        if (usuarios.length > 0) {
            const data = {
                data: usuarios,
                sqlMsg: `OK`,
                resMsg: `OK`
            }
            res.status(200).send(data)
        } else {
            const data = {
                data: usuarios,
                sqlMsg: `OK`,
                resMsg: `No se encontraron usuarios`
            }
            res.status(400).send(data)
        }
    } catch (error) {
        const data = {
            data: [],
            sqlMsg: error,
            resMsg: error
        }
        res.status(500).send(data)
    } finally{
        conn.release()
    }
}

exports.leerUsuarioPorId = async (req, res) => {
    const { idUsuario } = req.params
    if (idUsuario != "undefined") {
        const conn = await mysql.connection()
        try {
            const result = await conn.query(`CALL SP_BANCO_OBTENER_USUARIO_ID(?)`, idUsuario)
            const usuario = result[0];
            if (usuario.length > 0) {
                const data = {
                    data: usuario,
                    sqlMsg: `OK`,
                    resMsg: `OK`
                }
                res.status(200).send(data)
            } else {
                const data = {
                    data: usuario,
                    sqlMsg: `OK`,
                    resMsg: `No se encuentra el usuario en db`
                }
                res.status(400).send(data)
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        } finally{
            conn.release()
        }
    } else {
        const data = {
            data: null,
            sqlMsg: "",
            resMsg: 'No llego id de usuario'
        }
        res.status(400).send(data)
    }

}

exports.crearUsuario = async (req, res) => {
    
    const {nombre, apellido, email, nombreusuario, password, password2} = req.body


    
    if(!nombre || !apellido || !email || !nombreusuario || !password || !password2){
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
                        resMsg: `Error al hashear la pass ${error}`
                    }
                    res.status(500).send(data)
                } else {
                    const result = await conn.query(`CALL SP_CREAR_USUARIO(?, ?, ?, ?, ?, @o_mesaje)`, 
                        [nombre, hash, apellido, nombreusuario, email])
                        if (result[0][0].O_MENSAJE == 'OK') {
                            const data = {
                                data: null,
                                sqlMsg: result[0][0].O_MENSAJE,
                                resMsg: `OK`
                            }
                            res.status(200).send(data)
                        } else {
                            const data = {
                                data: null,
                                sqlMsg: result[0][0].O_MENSAJE,
                                resMsg: 'No se pudo crear el usuario'
                            }
                            res.status(200).send(data)
                        }
    
                }
            })
    
                
        } catch (error) {
            const data = {
                data: null,
                sqlMsg: "",
                resMsg: `Error al crear el usuario: ${error}`
            }
            res.status(500).send(data)
        } finally {
            conn.release()
        }
    }
    
}

exports.borrarUsuario = async (req, res) => {
    const { idUsuario } = req.params
    if (idUsuario != 'undefined') {
        const conn = await mysql.connection()
        try {
            const result = await conn.query(`CALL SP_BANCO_BORRAR_USUARIO(?)`, idUsuario)
            if (result[0][0].O_MENSAJE == 'OK') {
                const data = {
                    data: null,
                    sqlMsg: result[0][0].O_MENSAJE,
                    resMsg: `OK`
                }
                res.status(200).send(data)
            } else {
                const data = {
                    data: null,
                    sqlMsg: result[0][0].O_MENSAJE,
                    resMsg: 'No se pudo crear el usuario'
                }
                res.status(400).send(data)
            }
        } catch (error) {
            const data = {
                data: null,
                sqlMsg: result[0][0].O_MENSAJE,
                resMsg: `No se pudo eliminar el usuario: ${error}`
            }
            res.status(500).send(data)
        } finally{
            conn.release()
        }
    } else {
        const data = {
            data: null,
            sqlMsg: "",
            resMsg: 'No llego id de usuario'
        }
        res.status(400).send(data)
    }

}

exports.actualizarUsuario = async (req, res) => {
    const usuario = req.body
    if (!usuario.USUARIO_ID || !usuario.USUARIO_NOMBRES || !usuario.USUARIO_APELLIDOS || !usuario.USUARIO_TIPO_USUARIO_ID) {
        const data = {
            data: null,
            sqlMsg: "",
            resMsg: 'Los campos nombres, apellidos y tipo usuario son obligatorios para la actualizacion de usuarios.'
        }
        return res.status(200).send(data)
        
    } else if (!usuario.USUARIO_PASS && !usuario.USUARIO_PASS2)  {
        const conn = await mysql.connection()
        try {
            const result = await conn.query(`CALL SP_BANCO_ACTUALIZAR_USUARIO(?, ?, ?, ?, ?, ?, ?, @o_mensaje)`, 
                        [usuario.USUARIO_ID,
                        usuario.USUARIO_PASS,
                        usuario.USUARIO_NOMBRES, 
                        usuario.USUARIO_APELLIDOS, 
                        usuario.USUARIO_EMAIL, 
                        usuario.USUARIO_TIPO_USUARIO_ID, 
                        usuario.USUARIO_CUIL])
            if (result[0][0].O_MENSAJE == 'OK') {
                const data = {
                    data: null,
                    sqlMsg: result[0][0].O_MENSAJE,
                    resMsg: `OK`
                }
                res.status(200).send(data)
            } else {
                const data = {
                    data: null,
                    sqlMsg: result[0][0].O_MENSAJE,
                    resMsg: 'No se pudo editar el usuario'
                }
                res.status(500).send(data)
            }
        } catch (error) {
            const data = {
                data: [],
                sqlMsg: error.sqlMessage,
                resMsg: error.sqlMessage
            }
            res.status(500).send(data)
        } finally{
            conn.release()
        }
    } else {
        if (!usuario.USUARIO_PASS2 || !usuario.USUARIO_PASS || usuario.USUARIO_PASS2 != usuario.USUARIO_PASS) {
                const data = {
                    data: null,
                    sqlMsg: "",
                    resMsg: "los campos PASS y PASS2 no pueden estar vacios y deben ser iguales para actualizar password de usuario"
                }
                res.status(400).send(data)
        }
        else {
            bcrypt.hash(usuario.USUARIO_PASS, saltRounds, async function(err, hash) { 
                if(!err) {
                    const conn = await mysql.connection()
                    try {
                        const result = await conn.query(`CALL SP_BANCO_ACTUALIZAR_USUARIO(?, ?, ?, ?, ?, ?, ?, @o_mensaje)`, 
                                                            [usuario.USUARIO_ID,
                                                            hash,
                                                            usuario.USUARIO_NOMBRES, 
                                                            usuario.USUARIO_APELLIDOS, 
                                                            usuario.USUARIO_EMAIL, 
                                                            usuario.USUARIO_TIPO_USUARIO_ID, 
                                                            usuario.USUARIO_CUIL])
                        if (result[0][0].O_MENSAJE == 'OK') {
                            const data = {
                                data: null,
                                sqlMsg: result[0][0].O_MENSAJE,
                                resMsg: `OK`
                            }
                            res.status(200).send(data)
                        } else {
                            const data = {
                                data: null,
                                sqlMsg: result[0][0].O_MENSAJE,
                                resMsg: 'No se pudo editar el usuario'
                            }
                            res.status(500).send(data)
                        }
                    } catch (error) {
                        const data = {
                            data: [],
                            sqlMsg: error.sqlMessage,
                            resMsg: error.sqlMessage
                        }
                        res.status(500).send(data)
                    } finally{
                        conn.release()
                    }
                } else {
                    const data = {
                        data: null,
                        sqlMsg: "",
                        resMsg: "Error para hash de contraseña, los campos de pass y pass2 deben ser strings."
                    }
                    res.status(500).send(data)
                }
            })
        }
    }
}




