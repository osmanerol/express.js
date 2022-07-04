import StatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthenticatedError('No token provided.')
  }
  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET)
    req.user = decodedToken.username
    next()
  }
  catch(error) {
    throw new UnAuthenticatedError('Not authorized to access this route.')
  }
}

export default auth