const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 40,
      unique: true,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
      minlength: 5,
      maxlength: 15,
    },
    subscription: {
      type: String,
      minlength: 3,
      maxlength: 7,
      required: [true, 'Subscription is required'],
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 15,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: '',
    }
  },
  { versionKey: false, timestamps: true }
)

const Contact = new model('Contact', contactSchema)

module.exports = Contact