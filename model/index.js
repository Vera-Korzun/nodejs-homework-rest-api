const Contact = require('./schema/schema')

const listContacts = async () => {
  const contactsList = await Contact.find({})
  // console.log('contactsList', contactsList)
  return contactsList
}

const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId)
  // console.log('contactById', contactById)
  return contactById
}

const removeContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndRemove(contactId)
  // console.log('removedContact', removedContact)
  return removedContact
}

const addContact = async (body) => {
  const newContact = await Contact.create(body)
  // console.log('newContact', newContact)
  return newContact
}

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true })
  // console.log('updatedContact', updatedContact)
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
