import express from 'express'
import 'dotenv/config'
import 'express-async-errors'
import connectDB from './database/connectDB.js'
import authRoutes from './routes/auth.js'
import notFoundMiddleware from './middlewares/notFound.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/api/v1/auth', authRoutes)
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