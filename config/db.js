const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        //mongodb://127.0.0.1:27017/bookmycourt
        const conn = await mongoose.connect('mongodb+srv://aleesharahiman:aleesha@cluster0.olaw1bh.mongodb.net/bookmycourt')
        console.log('MongoDb database connection established');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB