const express = require('express')
const router = express.Router()
const Campus_C = require('../Controllers/Campus_Controller')
const isAuth = require("../Middlewares/Auth")
const isAdmin = require("../Middlewares/Admin")

router.post('/register',isAdmin,Campus_C.create)
router.get('/getAll',isAuth,Campus_C.getAll)
router.patch('/:id',isAdmin,Campus_C.update)

module.exports = router
