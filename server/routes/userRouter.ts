import { Router } from "express";
import { validatorSignUp, validatorSignIn } from "../middlewares/validators";
import {registerUser, removeUser, signInUser, updateUser, getInfo, tokenValidator} from '../controllers/userController';
import { authenticateToken } from "../middlewares/authToken";

const userRouter = Router()

/**
 * @method POST /user/signup
 * @desc signing up, and get access token
 * @access Public
 */
userRouter.post('/signup', validatorSignUp(), registerUser)

/**
 * @method POST /user/signin
 * @desc signing in, and get access token
 * @access Public
 */
userRouter.post('/signin', validatorSignIn(), signInUser)


userRouter.get('/tokenvalidation', authenticateToken, tokenValidator)

/**
 * @method POST /user/getinfo
 * @desc get user info
 * @access Private
 */
userRouter.post('/getinfo', getInfo)

/**
 * @method POST /user/updateprofile
 * @desc update profile
 * @access Public
 */
userRouter.post('/updateprofile', updateUser)

/**
 * @method POST /user/deleteuser
 * @desc delete user
 * @access Public
 */
userRouter.post('/deleteuser', removeUser)

export default userRouter