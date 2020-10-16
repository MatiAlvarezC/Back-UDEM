const express = require('express');
const Sport_C = require('../Controllers/Sport-Controller')
const router = express.Router();

router.post('/register', Sport_C.create)
router.patch('/update', Sport_C.update)
router.get('/getAll', Sport_C.getAll)

router.get('/:id', Sport_C.getByID)

module.exports = router
