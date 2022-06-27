import express from 'express'
import 'dotenv/config'
import connectDB from './database/connectDB.js'
import productRoutes from './routes/product.js'
import errorHandler from './middlewares/errorHandler.js'
import notFound from './middlewares/notFound.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/api/products', productRoutes)
app.use(errorHandler)
app.use(notFound)

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