const express = require('express')
const router = express.Router()
const Blood_C = require('../Controllers/Blood_Controller')

router.get('/getAll',Blood_C.getAll)

module.exports = router
