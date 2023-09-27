///////// RUTAS


const express = require('express')
const router = express.Router()
const users = require('../models/users')

router.post('/signup', users.crearUsuario)

module.exports = router;