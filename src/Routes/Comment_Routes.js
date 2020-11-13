const express = require('express')
const router = express.Router()
const Comment_C = require('../Controllers/Comment_Controller')

router.post('/write/:id',Comment_C.create)

module.exports = router
