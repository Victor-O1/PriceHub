import mongoose from "mongoose"

let isConnected = false; // track the connection 
const connectDB = async () => {

    mongoose.set("strictQuery", true)
    if (!process.env.DATABASE_URI) return console.log("DATABASE_URI is not defined");
    if (isConnected) return console.log("MongoDB is already connected")
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URI)
        isConnected = true
        console.log(`MongoDB Connected: ${connection.host}`)
    }
    catch (e) {
        console.log(e)
    }
}

export default connectDB