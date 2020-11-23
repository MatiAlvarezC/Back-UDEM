const express = require('express')
const router = express.Router()
const Player_C = require('../Controllers/Player_Controller')

router.post('/register',Player_C.create)
router.get('/getAll',Player_C.getAll)
router.get('/getMaxPages', Player_C.getMaxPages)
router.get('/:id',Player_C.getById)

router.patch('/update/:id',Player_C.update)
router.post('/assignToTeam/:id',Player_C.assignToTeam)

router.get('/getTeams/:id',Player_C.getTeamsByPlayer)

router.get('/:page/:order/:by',Player_C.getByPage)

router.post('/assignToChampionship/:id',Player_C.assignToChampionship)
router.get('/getAssignedChampionship/:id',Player_C.getAssignedChampionship)

module.exports = router
