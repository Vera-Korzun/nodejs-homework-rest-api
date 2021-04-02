const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose
const { Subscription } = require('../../helpers/constants')

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
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: Subscription.FREE,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: '',
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact
