"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validators_1 = require("../middlewares/validators");
const userController_1 = require("../controllers/userController");
const authToken_1 = require("../middlewares/authToken");
const userRouter = (0, express_1.Router)();
/**
 * @route POST /user/signup
 * @desc signing up, and get access token
 * @access Public
 */
userRouter.post('/signup', (0, validators_1.validatorSignUp)(), userController_1.registerUser);
/**
 * @route POST /user/signin
 * @desc signing in, and get access token
 * @access Public
 */
userRouter.post('/signin', (0, validators_1.validatorSignIn)(), userController_1.signInUser);
userRouter.get('/tokenvalidation', authToken_1.authenticateToken, userController_1.tokenValidator);
/**
 * @route POST /user/getinfo
 * @desc get user info
 * @access Private
 */
userRouter.post('/getinfo', userController_1.getInfo);
/**
 * @route POST /user/updateprofile
 * @desc update profile
 * @access Public
 */
userRouter.post('/updateprofile', userController_1.updateUser);
exports.default = userRouter;
