const express = require('express')
const router = express.Router()
const Program_C = require('../Controllers/Program_Controller')
const isAuth = require("../Middlewares/Auth")
const isAdmin = require("../Middlewares/Admin")

router.post('/register',isAdmin,Program_C.create)
router.get('/getAll',isAuth,Program_C.getAll)
router.patch('/:id',isAdmin,Program_C.update)

module.exports = router
