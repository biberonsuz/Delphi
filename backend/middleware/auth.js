const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret')
    req.userId = decoded.userId
    next()
  } catch (err) {
    console.error('Error decoding token:', err)
    res.status(401).json({ message: 'Invalid token' })
  }
}
module.exports = authMiddleware
