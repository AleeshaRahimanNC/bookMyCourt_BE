const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/bookmycourt')
        console.log('MongoDb database connection established');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB