import StatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors/index.js'

const login = async (req, res) => {
  const { username, password } = req.body
  if(!username || !password) {
    throw new BadRequestError('Please provide username and password.')
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })
  res.status(StatusCodes.OK).json({
    success: true,
    data: token
  })
}

const dashboard = async (req, res) => {
  console.log(req.user)
  res.status(StatusCodes.OK).json({
    success: true,
    data: req.user
  })
}

export default {
  dashboard,
  login
}