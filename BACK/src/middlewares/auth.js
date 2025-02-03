const User = require('../api/models/user')
const { verifyJwt } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(403).json('You are not authorized')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)
    const user = await User.findById(id)

    if (!user) {
      return res.status(403).json('User not found')
    }

    user.password = null
    req.user = user
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(403).json('You are not authorized!')
  }
}

module.exports = { isAuth }
