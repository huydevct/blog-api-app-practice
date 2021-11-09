const mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURI');
const dbUser = config.get('mongoUserURI')
require('dotenv').config()

async function connect(name, dbURI){
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected ${name} DB `)
    } catch (error) {
        console.log(error.message)  
        process.exit(1)      
    }
}

const connectDB = connect("posts",process.env.MONGODB_URI || db)
const connectUserDB = connect("users",process.env.MONGODB_USER_URI || dbUser)

// const connectUserDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_USER_URI || dbUser, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         console.log('Connected User DB')
//     } catch (error) {
//         console.log(error.message);
//         process.exit(1);
//     }
// }

module.exports = {
    connectDB,
    connectUserDB,
};