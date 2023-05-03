import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";
dotenv.config();


export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]!.split(" ")[1]; 
  if (!token)
  return res.status(401).json({ message: "token not found" });
      jwt.verify(token, process.env.SECRET!, (err, payload) => {
      if (err) throw new Error("token not verified");    
      next()})
  } catch (error: any) {
    res.json({message: error.message})
  }
};