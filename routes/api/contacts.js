const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controller')

router.get('/', ctrlContact.get)

router.get('/:contactId', ctrlContact.getById)

router.post('/', ctrlContact.add)

router.delete('/:contactId', ctrlContact.remove)

router.patch('/:contactId', ctrlContact.update)

module.exports = router
