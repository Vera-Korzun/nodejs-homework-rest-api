const User = require('./schema/user')

const findUserById = async (id) => {
  const userById = await User.findById(id)
  // console.log('userById', userById)
  return userById
}

const findUserByEmail = async (email) => {
  const userByEmail = await User.findOne({ email })
  // console.log('userByEmail', userByEmail)
  return userByEmail
}

const addUser = async (body) => {
  const newUser = await new User(body).save()
  // console.log('newUser', newUser)
  return newUser
}

const updateToken = async (id, token) => {
  const newToken = await User.updateOne({ _id: id }, { token })
  // console.log('newToken', newToken)
  return newToken
}

const patchAvatar = async (id, avatar) => {
  const user = await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true })
  return user
}

const findByVerifyToken = async ({ token }) => {
  const user = await User.findOne({ verifyToken: token })
  return user
}

const updateVerifyToken = async (id, verify, verifyToken) => {
  const user = await User.findByIdAndUpdate(id, { verify, verifyToken })
  return user
}

module.exports = {
  findUserById,
  findUserByEmail,
  addUser,
  updateToken,
  patchAvatar,
  findByVerifyToken,
  updateVerifyToken
}
