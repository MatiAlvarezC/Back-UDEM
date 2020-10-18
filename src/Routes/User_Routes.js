const express = require('express')
const User_C = require('../Controllers/User_Controller')
const router = express.Router()

router.post('/login',User_C.login)
router.post('/register',User_C.create)
router.get('/users',User_C.getAll)

router.get('/UserLogin/:id',User_C.get_user_login)




module.exports = router
