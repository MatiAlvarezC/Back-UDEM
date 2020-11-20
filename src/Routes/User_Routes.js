const express = require('express')
const User_C = require('../Controllers/User_Controller')
const router = express.Router()
const isAuth = require("../Middlewares/Auth")

router.post('/login',User_C.login)
router.get('/token',isAuth,User_C.token)
router.post('/register',User_C.create)
router.get('/getAll',User_C.getAll)
router.get('/getTrainers',User_C.getTrainers)
router.get('/:id',User_C.getById)
router.patch('/update/:id',User_C.update)
router.post('/assignToTeam/:id',User_C.assignToTeam)
router.get('/getAssignedTeamsIds/:id',User_C.getAssignedTeamsIds)


router.get('/getTrainersBySport/:idSport',User_C.getTrainersBySport )


module.exports = router
