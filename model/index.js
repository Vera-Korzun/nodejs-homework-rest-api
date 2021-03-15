const { v4: uuidv4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath, (err, data) => {
    if (err) throw err
    return data
  })
  // console.table(JSON.parse(contactList))
  return (JSON.parse(contactsList))
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts()
  const contactById = contactsList.find((item) => String(item.id) === contactId)
  // console.table(contactById)
  return contactById
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const removedContact = contactsList.find((item) => String(item.id) === contactId)
  const newContactsList = contactsList.filter((item) => String(item.id) !== contactId)
  const contactsString = JSON.stringify(newContactsList)

  await fs.writeFile(contactsPath, contactsString, (err) => {
    if (err) throw err
  })
  // console.log(removedContact)
  // console.table(newContactsList)
  return removedContact
}

const addContact = async (body) => {
  const contactsList = await listContacts()
  const newContact = { id: uuidv4(), ...body }
  const newContactsList = [...contactsList, newContact]
  const contactsString = JSON.stringify(newContactsList)

  fs.writeFile(contactsPath, contactsString, function (err) {
    if (err) throw err
  })
  // console.table(newContact)
  // console.table(newContactsList)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts()

  const contact = contactsList.find((item) => String(item.id) === contactId)
  const updatedContact = { ...contact, ...body }
  const updatedContactsList = JSON.stringify(contactsList.map((item) => (String(item.id) === contactId ? updatedContact : item)))

  await fs.writeFile(contactsPath, updatedContactsList, err => {
    if (err) throw err
  })

  // console.table(updatedContact)
  // console.table(updatedContactsList)
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}