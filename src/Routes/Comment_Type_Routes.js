const express = require('express');
const Comment_Type_R = require('../Controllers/Comment_Type_Controller')

const router = express.Router();

router.post('/register', Comment_Type_R.create)
router.get('/getAll',Comment_Type_R.getAll)
router.patch('/:id',Comment_Type_R.update)

module.exports = router;
