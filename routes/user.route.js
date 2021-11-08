const express = require('express')
const userRouter = express.Router();

userRouter.post('/register', (req,res,next) => {
    res.send('Register')
})

module.exports = userRouter