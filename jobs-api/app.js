import express from 'express'
import 'dotenv/config'
import 'express-async-errors'
import helmet from 'helmet'
import cors from 'cors'
import xssClean from 'xss-clean'
import expressRateLimit from 'express-rate-limit'
import connectDB from './database/connectDB.js'
import authRoutes from './routes/auth.js'
import jobsRoutes from './routes/jobs.js'
import authMiddleware from './middlewares/auth.js'
import notFoundMiddleware from './middlewares/notFound.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xssClean())
app.use(expressRateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10, 
	standardHeaders: true, 
	legacyHeaders: false,
}))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authMiddleware, jobsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening port: ${port}`))
  }
  catch(error) {
    console.log(error)
  }
}

start()