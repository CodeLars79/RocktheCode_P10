const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['admin', 'user']
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
