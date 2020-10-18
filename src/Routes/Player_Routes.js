const express = require('express')
const router = express.Router()
const Player_C = require('../Controllers/Player_Controller')

router.post('/register',Player_C.create)
router.get('/getAll',Player_C.getAll)
router.get('/:id',Player_C.getById)
router.patch('/update/:id',Player_C.update)

module.exports = router
