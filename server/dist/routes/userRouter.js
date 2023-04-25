"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validators_1 = require("../middlewares/validators");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
/**
 * @method POST /user/signup
 * @desc signing up, and get access token
 * @access Public
 */
userRouter.post('/signup', (0, validators_1.validatorSignUp)(), userController_1.registerUser);
/**
 * @method POST /user/signin
 * @desc signing in, and get access token
 * @access Public
 */
userRouter.post('/signin', (0, validators_1.validatorSignIn)(), userController_1.signInUser);
/**
 * @method POST /user/getinfo
 * @desc get user info
 * @access Private
 */
userRouter.post('/getinfo', userController_1.getInfo);
/**
 * @method POST /user/updateprofile
 * @desc update profile
 * @access Public
 */
userRouter.post('/updateprofile', userController_1.updateUser);
/**
 * @method POST /user/deleteuser
 * @desc delete user
 * @access Public
 */
userRouter.post('/deleteuser', userController_1.removeUser);
exports.default = userRouter;
