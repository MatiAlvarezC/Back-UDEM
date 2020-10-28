const express = require('express')
const router = express.Router()
const Medical_C = require('../Controllers/Medical_Controller')

router.get('/getAll',Medical_C.getAll)

module.exports = router
