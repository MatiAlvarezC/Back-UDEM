const express = require('express');
const Team_C = require('../Controllers/Team_Controller')
const router = express.Router();
const isAuth = require("../Middlewares/Auth")
const isAdmin = require("../Middlewares/Admin")

router.post('/register',isAdmin, Team_C.create)
router.patch('/update/:id',isAdmin, Team_C.update)
router.get('/getAll',isAdmin, Team_C.getAll)
router.get('/:id',isAuth, Team_C.getByID)
router.get('/getAll/:id',isAdmin, Team_C.getBySport)

module.exports = router
