import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import postsRouter from './routes/posts.js'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/posts', postsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server started at port : ${process.env.PORT}`)
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))
})