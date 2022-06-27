import express from 'express'
import productController from '../controllers/product.js'

const router = express.Router()

router.route('/')
  .get(productController.getAllItems)

export default router