const express = require('express')
const User_C = require('../Controllers/User_Controller')
const router = express.Router()

router.post('/login',User_C.login)
router.post('/register',User_C.create)
router.get('/getAll',User_C.getAll)
router.get('/:id',User_C.getById)
router.patch('/update/:id',User_C.update)
router.post('/assignToTeam/:id',User_C.assignToTeam)
router.get('/getAssignedTeamsIds/:id',User_C.getAssignedTeamsIds)


module.exports = router
