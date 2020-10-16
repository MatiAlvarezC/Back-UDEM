const express = require('express')
const router = express.Router()
const Player_C = require('../Controllers/Player_Controller')

router.post('/register',Player_C.create)

module.exports = router
