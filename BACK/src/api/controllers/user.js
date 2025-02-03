const { generateKey } = require('../../utils/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')

//* Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    if (!users.length) {
      return res.status(404).json({ message: 'No users found' })
    }
    return res.status(200).json(users)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching users', error: error.message })
  }
}
//* Get a user by ID
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(user)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching user', error: error.message })
  }
}

//* Register a new user
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const userDuplicated = await User.findOne({ email })

    if (userDuplicated) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = new User({
      name,
      email,
      password,
      role: 'user'
    })

    const user = await newUser.save()
    return res.status(201).json(user)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error occurred during registration', error })
  }
}

//* User login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect email or password' })
    }

    const token = generateKey(user._id)

    user.password = undefined

    return res.status(200).json({ token, user })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}
//* Update a user by ID
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (req.user._id.toString() !== id) {
      return res.status(400).json('You are not allowed to update this user')
    }

    const oldUser = await User.findById(id)
    const newUser = new User(req.body)
    newUser._id = id
    newUser.events = [...oldUser.events, ...newUser.events]
    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true
    })

    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(400).json('error')
  }
}

module.exports = {
  getUsers,
  getUserById,
  register,
  updateUser,
  login
}
