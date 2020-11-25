const express = require('express')
const router = express.Router()
const Player_C = require('../Controllers/Player_Controller')
const isAuth = require("../Middlewares/Auth")
const isAdmin = require("../Middlewares/Admin")

router.post('/register',isAdmin,Player_C.create)
router.get('/getAll',isAdmin,Player_C.getAll)
router.get('/getMaxPages',isAuth,Player_C.getMaxPages)
router.get('/:id',isAuth,Player_C.getById)

router.patch('/update/:id',isAdmin,Player_C.update)
router.post('/assignToTeam/:id',isAdmin,Player_C.assignToTeam)

router.get('/getTeams/:id',isAuth,Player_C.getTeamsByPlayer)

router.get('/:page/:order/:by',isAuth,Player_C.getByPage)

router.post('/assignToChampionship/:id',Player_C.assignToChampionship)
router.get('/getAssignedChampionship/:id',Player_C.getAssignedChampionship)

module.exports = router
