import 'dotenv/config'
import connectDB from './database/connectDB.js'
import Product from './models/Product.js'
import jsonProducts from './products.js'

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(jsonProducts)
    process.exit(0)
  } catch(error) {
    console.log(error)
    process.exit(1)
  }
}

start()