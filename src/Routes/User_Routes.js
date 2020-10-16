const express = require('express')
const User_C = require('../Controllers/User_Controller')
const router = express.Router()

router.post('/login',User_C.login)
router.post('/register',User_C.create)
router.get('/users',User_C.getAll)

module.exports = router
