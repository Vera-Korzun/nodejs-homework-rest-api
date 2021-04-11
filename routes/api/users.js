const express = require('express')
const router = express.Router()
const ctrlUser = require('../../controller/users')
const { validateUser } = require('../../helpers/validation/validation')
const { guard } = require('../../helpers/guard')
const upload = require('../../helpers/upload')

router.post('/auth/register', validateUser, ctrlUser.reg)
router.post('/auth/login', validateUser, ctrlUser.login)
router.post('/auth/logout', guard, ctrlUser.logout)
router.get('/current', guard, ctrlUser.current)
router.patch('/avatars', guard, upload.single('avatar'), ctrlUser.avatar)

module.exports = router
