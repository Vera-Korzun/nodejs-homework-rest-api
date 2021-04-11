const fs = require('fs').promises
const path = require('path')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const gravatar = require('gravatar')
const Jimp = require('jimp')
const { findUserById, findUserByEmail, addUser, updateToken, patchAvatar } = require('../model/users')
const createFolderIsExist = require('../helpers/createFolder')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR)

const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await findUserByEmail({ email })
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        data: 'Conflict',
        message: 'Email in use',
      })
    }
    const gravatarURL = gravatar.url(email, { protocol: 'https', s: '100' })
    console.log('gravatarURL', gravatarURL)
    const newUser = await addUser({ ...req.body, avatarURL: gravatarURL })
    console.log('newUser', newUser)
    return res.status(201).json({
      status: 'success',
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription
        },
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail({ email })
    // const isValidPassword = await user.validPassword(password)
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        data: 'Unauthorized',
        message: 'Email or password is wrong',
      })
    }
    const id = user._id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await updateToken(id, token)
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        token,
        user
      },
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await updateToken(id, null)
    return res.status(204).json({
      status: 'No Content',
      code: 204,

    })
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  try {
    const { id, email, subscription, avatarURL } = req.user
    const user = await findUserById(id)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      })
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        email,
        subscription,
        avatarURL,
      },
    })
  } catch (err) {
    next(err)
  }
}

const avatar = async (req, res, next) => {
  const { path: tempName, originalname } = req.file
  const { id } = req.user
  await createFolderIsExist(uploadDir)
  const img = await Jimp.read(tempName)
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempName)
  const newName = path.join(uploadDir, `AVATAR${id}${path.extname(originalname)}`)
  try {
    await fs.rename(tempName, newName)
    const user = await patchAvatar(id, newName)
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'avatar link updated',
      data: { avatarURL: user.avatarURL },
    })
  } catch (error) {
    await fs.unlink(tempName)
    return next(error)
  }
}

module.exports = {
  reg,
  login,
  logout,
  current,
  avatar
}
