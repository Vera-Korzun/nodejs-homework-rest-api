const express = require('express')
const router = express.Router()
const ctrlUser = require('../../controller/user')

router.post('/auth/register', ctrlUser.reg)
router.post('/auth/login', ctrlUser.login)
router.post('/auth/logout', ctrlUser.logout)
router.get('/current', ctrlUser.getCurrentUser)

module.exports = router
