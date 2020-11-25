const express = require('express');
const Status_R = require('../Controllers/Status_Controller')
const isAuth = require("../Middlewares/Auth")
const isAdmin = require("../Middlewares/Admin")

const router = express.Router();

router.post('/register',isAdmin, Status_R.create)
router.get('/getAll',isAuth,Status_R.getAll)
router.patch('/:id',isAdmin, Status_R.update)

module.exports = router;
