import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthenticatedError('No token provided.')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-password')
    req.user = user
    next()
  }
  catch(error) {
    throw new UnAuthenticatedError('Authentication invalid.')
  }
}

export default auth