const express = require("express");
const userRouter = express.Router();
const createError = require("http-errors");

const { verifyAccessToken } = require("../config/jwt_service");
const UserController = require("../controllers/user.controller");

userRouter.post("/register", UserController.register);

userRouter.post("/login", UserController.logIn);

userRouter.get("/getlists", verifyAccessToken, UserController.getLists);

userRouter.post("/refresh-token", UserController.refreshToken);

userRouter.delete("/logout", UserController.logOut);

module.exports = userRouter;
