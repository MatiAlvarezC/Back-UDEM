const express = require('express');
const Test_C = require('../Controllers/Test_Controller')
const router = express.Router();
const isAdmin = require('../Middlewares/Admin')

router.get('/test/:sportId',isAdmin,Test_C.test)

module.exports = router