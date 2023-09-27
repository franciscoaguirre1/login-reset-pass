const express = require('express')
const router = express.Router()
const auth = require('../models/auth')

router.post('/login', auth.login)
router.post('/olvidePassword', auth.forgotPassword)
router.post('/cambiarPassword', auth.resetPassword)


module.exports = router;