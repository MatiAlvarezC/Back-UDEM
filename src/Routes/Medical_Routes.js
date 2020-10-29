const express = require('express')
const router = express.Router()
const Medical_C = require('../Controllers/Medical_Controller')

router.get('/getMaxPages',Medical_C.getMaxPages)
router.get('/getByPage/:page',Medical_C.getByPage)

module.exports = router
