const JWT = require('jsonwebtoken');

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '1h' //10m, 10s
        }
        
        JWT.sign(payload, secret, options, (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
    })
}

module.exports = {
    signAccessToken
}