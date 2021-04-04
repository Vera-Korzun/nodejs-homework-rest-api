const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controller')
const { guard } = require('../../helpers/guard')

router.get('/', guard, ctrlContact.get)

router.get('/:contactId', guard, ctrlContact.getById)

router.post('/', guard, ctrlContact.add)

router.delete('/:contactId', guard, ctrlContact.remove)

router.patch('/:contactId', guard, ctrlContact.update)

module.exports = router
