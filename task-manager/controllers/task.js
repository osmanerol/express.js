import StatusCodes from 'http-status-codes'
import Task from '../models/Task.js'
import asyncWrapper from '../middleware/asyncWrapper.js'
import CustomError from '../middleware/customError.js'

const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find()
  res.status(StatusCodes.OK).json({
    success: true,
    data: tasks,
    amount: tasks.length
  })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: task
  })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id
  const task = await Task.findById(id)
  if(!task) {
    return next(new CustomError(StatusCodes.NOT_FOUND, `No task with id: ${id}`))
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: task
  })
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id
  const task = await Task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  if(!task) {
    return next(new CustomError(StatusCodes.NOT_FOUND, `No task with id: ${id}`))
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: task
  })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id
  const task = await Task.findByIdAndDelete(id)
  if(!task) {
    return next(new CustomError(StatusCodes.NOT_FOUND, `No task with id: ${id}`))
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: task
  })
})

export default {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask
}