const express = require('express')
const router = express.Router()
const Comment_C = require('../Controllers/Comment_Controller')

router.post('/write/:id',Comment_C.create)
router.patch('/update/:id', Comment_C.update)
router.get('/getAll', Comment_C.getAll)

module.exports = router
