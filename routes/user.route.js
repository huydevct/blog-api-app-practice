const express = require("express");
const userRouter = express.Router();
const createError = require("http-errors");

const User = require("../models/user.model");
const { userValidate } = require("../config/validation");
const {signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken} = require('../config/jwt_service')

userRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { error } = userValidate(req.body);
    console.log(`error validate: ${error}`);
    if (error) {
      throw createError(error.details[0].message);
    }

    // if(!username || !password){
    //     throw createError.BadRequest();
    // }

    const isExist = await User.findOne({
      username,
    });

    if (isExist) {
      throw createError.Conflict(`${username} is ready been register`);
    }

    // const isCreate = await User.create({
    //     username: username,
    //     password
    // })

    const user = new User({
      username,
      password,
    });

    const savedUser = await user.save();

    return res.json({
      status: "OK",
      elements: savedUser,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/login', async (req,res,next) => {
  try {
    const {error} = userValidate(req.body);
    if(error){
      throw createError(error.details[0].message);
    }

    const {username, password} = req.body;

    const user = await User.findOne({
      username
    });
    if(!user){
      throw createError.NotFound('User not registered')
    }

    const isValid = await user.isCheckPassword(password);
    if(!isValid){
      throw createError.Unauthorized();
    }
    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);
    res.json({
      accessToken,
      refreshToken
    })
  } catch (error) {
    next(error);
  }
});

userRouter.get('/getlists', verifyAccessToken,  (req,res,next) => {
  console.log(req.headers);
  const listUsers = [
    {
      username: 'abc@gmail.com',
    },
    {
      username: 'def@gmail.com',
    },
  ];
  
  res.json({
    listUsers
  })
});

userRouter.post('/refresh-token', async (req,res,next) => {
  try {
    console.log(req.body);
    const {refreshToken} = req.body;
    if(!refreshToken) throw createError.BadRequest();

    const {userId} = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);

    res.json({
      accessToken,
      refreshToken: refToken,
    })

  } catch (error) {
    next(error)
  }
})



module.exports = userRouter;
