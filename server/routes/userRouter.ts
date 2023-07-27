import { Router } from "express";
import { validatorSignUp, validatorSignIn } from "../middlewares/validators";
import {registerUser, signInUser, updateUser, getInfo, tokenValidator} from '../controllers/userController';
import { authenticateToken } from "../middlewares/authToken";

const userRouter = Router()

/**
 * @route POST /user/signup
 * @desc signing up, and get access token
 * @access Public
 */
userRouter.post('/signup', validatorSignUp(), registerUser)

/**
 * @route POST /user/signin
 * @desc signing in, and get access token
 * @access Public
 */
userRouter.post('/signin', validatorSignIn(), signInUser)


userRouter.get('/tokenvalidation', authenticateToken, tokenValidator)

/**
 * @route POST /user/getinfo
 * @desc get user info
 * @access Private
 */
userRouter.post('/getinfo', getInfo)

/**
 * @route POST /user/updateprofile
 * @desc update profile
 * @access Public
 */
userRouter.post('/updateprofile', updateUser)


export default userRouter