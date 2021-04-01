const jwt = require('jsonwebtoken')
const User = require('../model/schema/user')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findUserByEmail(email)
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        data: 'Conflict',
        message: 'Email in use',
      })
    }
    const newUser = await User.addUser(req.body)
    return res.status(201).json({
      status: 'success',
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
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
    const user = await User.findUserById(email)
    const isValidPassword = await user.validPassword(password)
    if (!user || !isValidPassword) {
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
    await User.updateToken(id, token)
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
    await User.updateToken(id, null)
    return res.status(204).json({
      status: 'No Content',
      code: 204,

    })
  } catch (e) {
    next(e)
  }
}
const getCurrentUser = async (req, res, next) => {
  try {
    const { id, email, subscription } = req.user
    const user = await User.findUserById(id)
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
      },
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  reg,
  login,
  logout,
  getCurrentUser
}
