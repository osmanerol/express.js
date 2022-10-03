import express from 'express'
import mongoose from 'mongoose'
import StatusCodes from 'http-status-codes'
import Post from '../models/post.js'
const router = express.Router()

router.get('/', async(req, res) => {
  try {
    const posts = await Post.find()
    res.status(StatusCodes.OK).json({
      data: posts,
      isSuccess: true
    })
  } catch(error) {
    res.status(StatusCodes.OK).json({
      data: null,
      error,
      isSuccess: false
    })
  }
})
 
router.post('/', async(req, res) => {
  try {
    const post = await Post.create(req.body)
    res.status(StatusCodes.CREATED).json({
      data: post,
      isSuccess: true
    })
  } catch(error) {
    res.status(StatusCodes.OK).json({
      data: null,
      error,
      isSuccess: false
    })
  }
})

router.get('/:id', async(req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Id is invalid',
        isSuccess: true
      })
    }
    const post = await Post.findById(req.params.id)
    res.status(StatusCodes.OK).json({
      data: post,
      isSuccess: true
    })
  } catch(error) {
    res.status(StatusCodes.OK).json({
      data: null,
      error,
      isSuccess: false
    })
  }
})

router.put('/:id', async(req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Id is invalid',
        isSuccess: true
      })
    }
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(StatusCodes.OK).json({
      data: post,
      isSuccess: true
    })
  } catch(error) {
    res.status(StatusCodes.OK).json({
      data: null,
      error,
      isSuccess: false
    })
  }
})

router.delete('/:id', async(req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Id is invalid',
        isSuccess: true
      })
    }
    const post = await Post.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({
      data: post,
      isSuccess: true
    })
  } catch(error) {
    res.status(StatusCodes.OK).json({
      data: null,
      error,
      isSuccess: false
    })
  }
})

export default router