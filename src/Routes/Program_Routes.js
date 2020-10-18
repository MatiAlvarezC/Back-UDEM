const express = require('express')
const router = express.Router()
const Program_C = require('../Controllers/Program_Controller')

router.post('/register',Program_C.create)
router.get('/getAll',Program_C.getAll)
router.patch('/:id',Program_C.update)

module.exports = router
