const express = require('express')
const router = express.Router()
const Medical_C = require('../Controllers/Medical_Controller')
const isAuth = require("../Middlewares/Auth")

router.get('/getMaxPages',isAuth,Medical_C.getMaxPages)
router.get('/getByPage/:page',isAuth,Medical_C.getByPage)

module.exports = router
