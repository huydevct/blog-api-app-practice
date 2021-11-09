const express = require('express')
const userRouter = express.Router();
const createError = require('http-errors');

const User = require('../models/user.model');
const {userValidate} = require('../config/validation');

userRouter.post('/register', async (req,res,next) => {
    try {
        const { email, password } = req.body;
        const {error} = userValidate(req.body);
        console.log(`error validate: ${error}`);
        if(error){
            throw createError(error.details[0].message)
        }

        // if(!email || !password){
        //     throw createError.BadRequest();
        // }



        const isExist = await User.findOne({
            username: email
        })

        if(isExist){
            throw createError.Conflict(`${email} is ready been register`);
        }

        const isCreate = await User.create({
            username: email,
            password
        })

        return res.json({
            status: 'OK',
            elements: isCreate
        })
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter