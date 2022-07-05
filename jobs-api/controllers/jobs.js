import StatusCodes from 'http-status-codes'
import Job from '../models/Job.js'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id }).sort('createdAt')
  res.status(StatusCodes.OK).json({
    success: true,
    count: jobs.length,
    data: jobs
  })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user._id
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: job
  })
}

const getJob = async (req, res) => {
  const {
    params: { id },
    user: { _id: userId }
  } = req
  const job = await Job.findOne({
    _id: id,
    createdBy: userId
  })
  if(!job) {
    throw new NotFoundError(`No job with id: ${id}`)
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: job
  })
}

const updateJob = async (req, res) => {
  const {
    params: { id },
    body: { company, position },
    user: { _id: userId }
  } = req
  if(!company || !position) {
    throw new BadRequestError('Company or position fields can not be empty.')
  }
  const job = await Job.findOneAndUpdate({
    _id: id,
    createdBy: userId
  }, req.body, { new: true })
  if(!job) {
    throw new NotFoundError(`No job with id: ${id}`)
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: job
  })
}

const deleteJob = async (req, res) => {
  const {
    params: { id },
    user: { _id: userId }
  } = req
  const job = await Job.findOneAndDelete({
    _id: id,
    createdBy: userId
  })
  if(!job) {
    throw new NotFoundError(`No job with id: ${id}`)
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: job
  })
}

export default {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
}