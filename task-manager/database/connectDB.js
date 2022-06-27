import mongoose from 'mongoose'

const connectDB = async connection => {
  await mongoose.connect(connection)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))
}

export default connectDB