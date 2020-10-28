const express = require('express')
const router = express.Router()
const Medical_C = require('../Controllers/Medical_Controller')

router.get('/getPoliciesByExpiration',Medical_C.getPoliciesByExpiration)

module.exports = router
