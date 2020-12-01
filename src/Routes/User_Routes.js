const express = require('express')
const User_C = require('../Controllers/User_Controller')
const router = express.Router()
const isAuth = require("../Middlewares/Auth")
const isAdmin = require("../Middlewares/Admin")


router.post('/login',User_C.login)
router.post('/recoverPassword',User_C.recoverPassword)
router.patch('/updatePassword',isAuth,User_C.updatePassword)
router.get('/token',isAuth,User_C.token)
router.post('/register',isAdmin,User_C.create)
router.get('/getAll',isAdmin,User_C.getAll)
router.get('/getAllTrainers',isAdmin,User_C.getTrainers)
router.patch('/update/:id',isAdmin,User_C.update)
router.post('/assignToTeam/:id',isAdmin,User_C.assignToTeam)
router.get('/getAssignedTeamsIds/:id',isAuth,User_C.getAssignedTeamsIds)
router.get('/getTrainersBySport/:idSport',User_C.getTrainersBySport )
router.get('/:id',isAdmin,User_C.getById)

module.exports = router
