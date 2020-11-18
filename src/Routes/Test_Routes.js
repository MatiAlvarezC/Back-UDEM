const express = require('express');
const Test_C = require('../Controllers/Test_Controller')
const router = express.Router();

router.get('/mail', Test_C.sendEmail)
router.get('/test',Test_C.test)

module.exports = router