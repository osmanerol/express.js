import StatusCodes from 'http-status-codes'
import User from '../models/User.js'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const login = async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) {
    throw new BadRequestError('Please provide email and password.')
  }
  const user = await User.findOne({ email })
  if(!user) {
    throw new UnAuthenticatedError('Invalid credentials.')
  }
  const isPasswrodCorrect = await user.comparePassword(password)
  if(!isPasswrodCorrect) {
    throw new UnAuthenticatedError('Invalid credentials.')
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    success: true,
    data: token
  })
}

const register = async (req, res) => {
  const user = await User.create(req.body,)
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: user
  })
}

export default {
  login,
  register
}