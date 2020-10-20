const express = require('express');
const Team_C = require('../Controllers/Team_Controller')
const router = express.Router();

router.post('/register', Team_C.create)
router.patch('/update/:id', Team_C.update)
router.get('/getAll', Team_C.getAll)
router.get('/:id', Team_C.getByID)

module.exports = router
