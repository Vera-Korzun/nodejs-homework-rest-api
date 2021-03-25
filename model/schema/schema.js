const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

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
      enum: ['free', 'pro', 'premium'],
      default: 'free',
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
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
)

// eslint-disable-next-line new-cap
const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact
