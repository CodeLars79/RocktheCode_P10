const jwt = require('jsonwebtoken')

const generateKey = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateKey, verifyJwt }
