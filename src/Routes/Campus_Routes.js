const express = require('express')
const router = express.Router()
const Campus_C = require('../Controllers/Campus_Controller')

router.post('/register',Campus_C.create)
router.get('/getAll',Campus_C.getAll)
router.patch('/:id',Campus_C.update)

module.exports = router
