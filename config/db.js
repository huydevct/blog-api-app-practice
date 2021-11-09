const mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURI');
const dbUser = config.get('mongoUserURI')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected DB')
    } catch (error) {
        console.log(error.message)  
        process.exit(1)      
    }
}

const connectUserDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_USER_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected User DB')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = {
    connectDB,
    connectUserDB,
};