const express = require("express");
const userRouter = express.Router();
const createError = require("http-errors");

const User = require("../models/user.model");
const { userValidate } = require("../config/validation");

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

    res.send(user);
  } catch (error) {
    next(error);
  }
});



module.exports = userRouter;
