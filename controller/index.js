const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/index')

const get = async (req, res, next) => {
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
}

const getById = async (req, res, next) => {
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
}

const add = async (req, res, next) => { 
  try {
    if (!req.body.name || !req.body.email || !req.body.phone) {
      let errorMessage = 'missing required'
      if (!req.body.name) {
        errorMessage += ' name'
      }
      if (!req.body.email) {
        errorMessage += ' email'
      }
      if (!req.body.phone) {
        errorMessage += ' phone'
      }
      errorMessage += ' field'
      return res.status(400).json({
        status: 'error',
        code: 404,
        message: errorMessage,
      })
    } else {
      const contact = await addContact(req.body)
      res.json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      })
    }
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      res.json({
        status: 'Contact deleted',
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
}

const update = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if (!req.body) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields',
      })
    }
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
        message: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { get, getById, add, remove, update }