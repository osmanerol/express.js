import StatusCodes from 'http-status-codes'
import CustomError from './customError.js'

const errorHandler = (error, req, res, next) => {
  if(error instanceof CustomError) {
    return res.status(error.status).json({
      success: false,
      error: error.message
    })
  }
  res.status(error.status).json({
    success: StatusCodes.INTERNAL_SERVER_ERROR,
    error: 'Something went wrong, try again later.'
  })
}

export default errorHandler