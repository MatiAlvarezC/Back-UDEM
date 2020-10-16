const express = require('express')
const User_C = require('../Controllers/api/Usuario_Controller')
const router = express.Router()

router.post('/register',User_C.createUser)

module.exports = router
