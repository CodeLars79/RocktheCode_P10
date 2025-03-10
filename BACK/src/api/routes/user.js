const { isAuth } = require('../../middlewares/auth')

const {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser
} = require('../controllers/user')

const usersRouter = require('express').Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/register', register)
usersRouter.post('/login', login)
usersRouter.put('/:id', [isAuth], updateUser)
usersRouter.delete('/:id', [isAuth], deleteUser)

module.exports = usersRouter
