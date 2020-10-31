const express = require('express')
const router = express.Router()
const Player_C = require('../Controllers/Player_Controller')

router.post('/register',Player_C.create)
router.get('/getAll',Player_C.getAll)
router.get('/getMaxPages', Player_C.getMaxPages)
router.get('/:id',Player_C.getById)

router.patch('/update/:id',Player_C.update)
router.post('/assignToTeam/:id',Player_C.assignToTeam)



router.get('/:page/:order/:by',Player_C.getByPage)


module.exports = router
