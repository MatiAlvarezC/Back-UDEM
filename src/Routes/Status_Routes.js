const express = require('express');
const Status_R = require('../Controllers/Status_Controller')

const router = express.Router();

router.post('/register', Status_R.create)
router.get('/getAll',Status_R.getAll)
router.patch('/:id',Status_R.update)

module.exports = router;




