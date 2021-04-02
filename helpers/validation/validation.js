const Joi = require('joi')

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).max(20).required(),
  })
  const { error } = schema.validate(req.body)
  if (error) {
    const [{ message }] = error.details
    return res.status(400).json({
      status: 400,
      message,
      data: 'Bad Request',
    })
  }
  next()
}

module.exports = { validateUser }
