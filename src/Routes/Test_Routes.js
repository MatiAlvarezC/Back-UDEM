const express = require('express');
const Test_C = require('../Controllers/Test_Controller')
const router = express.Router();

router.get('/mail', Test_C.sendEmail)

module.exports = router