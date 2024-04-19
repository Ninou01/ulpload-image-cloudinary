const mongoose = require("mongoose")

const mongoURI = "mongodb+srv://admin:fbue$ita@cluster0.15f8bfi.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI)
        console.log("mongoDB connected")
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = connectDB
