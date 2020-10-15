const express = require('express');
const Status_R = require('../Controllers/Status-C')

const router = express.Router();

/*-- Ruta inicial del proyecto--*/
router.get('/', Status_R.status);


module.exports = router;




