import express from 'express'
import 'dotenv/config'
import connectDB from './database/connectDB.js'
import errorHandler from './middleware/errorHandler.js'
import taskRoutes from './routes/task.js'

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use('/task', taskRoutes)
app.use(errorHandler)

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