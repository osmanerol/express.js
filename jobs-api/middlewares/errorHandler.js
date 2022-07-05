import StatusCodes from 'http-status-codes'
import CustomError from '../errors/customError.js'

const errorHandler = (error, req, res, next) => {
  let customApiError = {
    status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong, try again later.'
  }
  if(error.name === 'ValidationError') {
    customApiError.status = StatusCodes.BAD_REQUEST
    customApiError.message = Object.values(error.errors).map(item => item.message)
  }
  else if(error.name === 'CastError') {
    customApiError.status = StatusCodes.NOT_FOUND
    customApiError.message = `No item found with id: ${error.value}`
  }
  else if(error.code && error.code === 11000) {
    customApiError.status = StatusCodes.BAD_REQUEST
    customApiError.message = `Duplicate value entered for ${Object.keys(error.keyValue)} field, please choose another value`
  }
  res.status(customApiError.status).json({
    success: false,
    message: customApiError.message,
    error
  })
  /*
  if(error instanceof CustomError) {
    return res.status(error.status).json({
      success: false,
      message: error.message
    })
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong, try again later.',
    error
  })
  */
}

export default errorHandler