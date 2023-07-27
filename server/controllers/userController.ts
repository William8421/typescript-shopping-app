import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/User';
import bcrypt from "bcryptjs";
import generateToken from '../helper/generateToken';

const findUserByEmail = async (email: string) => {
  return await User.findByEmail(email);
};

const findUserByUsername = async (username: string) => {
  return await User.findByUsername(username);
};

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    username,
    firstName,
    lastName,
    email,
    password,
    itemName,
    price,
    imgUrl
  } = req.body;

  const existingEmailUser = await findUserByEmail(email);
  if (existingEmailUser) {
    return res.status(409).json({ msg: "Sorry, the email already exists" });
  }

  const existingUsernameUser = await findUserByUsername(username);
  if (existingUsernameUser) {
    return res.status(409).json({ msg: "Sorry, the username already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const allUsers = await User.find();
  const id =
    allUsers.reduce((a, b) => {
      return Math.max(a, b.id);
    }, 0) + 1;

  const newUser = await User.create({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    id,
    itemName,
    price,
    imgUrl
  });

  if (newUser) {
    const payload = { id, username };
    const token = generateToken(payload);
    res.status(200).json({ user: newUser, token, msg: "Thank you for signing up!" });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).json({ msg: 'Either email or password is incorrect!' });
  }

  const token = generateToken({ id: user.id, username: user.username });

  res.status(200).json({
    message: "You are logged in!",
    token,
    user
  });
};

export const tokenValidator = (req: Request, res: Response) => {
  res.json(req.body);
};

export const getInfo = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id, username, firstName, lastName } = req.body;

  try {
    await User.findOneAndUpdate({ id }, {
      username,
      firstName,
      lastName,
    });
    res.status(200).json(`Your information was updated successfully`);
  } catch (error) {
    res.status(500).json(error);
  }
};
