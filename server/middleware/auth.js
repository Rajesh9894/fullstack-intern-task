const jwt = require('jsonwebtoken')

// middleware to check if user is logged in
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, please login first' })
  }

  // token comes as "Bearer <token>"
  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded  // attach user info to request
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid or expired' })
  }
}

module.exports = authMiddleware
