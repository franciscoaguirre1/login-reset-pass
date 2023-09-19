const express = require('express')
const router = express.Router()
const users = require('../models/users')

router.get('/', users.leerUsuarios)
router.get('/:idUsuario', users.leerUsuarioPorId)
router.post('/signup', users.crearUsuario)
router.delete('/:idUsuario', users.borrarUsuario)
router.put('/', users.actualizarUsuario)

module.exports = router;