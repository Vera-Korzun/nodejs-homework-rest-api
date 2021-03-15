const express = require('express')
const router = express.Router()
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found contact',
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const contacts = await addContact(req.body)
    res.json({
      status: 'success',
      code: 201,
      data: {
        contacts,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found contact',
      })
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found contact',
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
