import express from 'express'
import authController from '../controllers/auth.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router()

router.post('/login', authController.login)
router.get('/dashboard', authMiddleware, authController.dashboard)

export default router