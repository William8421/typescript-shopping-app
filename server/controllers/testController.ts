import {Request, Response} from 'express'
import Test from '../models/Test'

export const getTest = async (req: Request, res: Response) => {
    const allUsers = await Test.find()    
    res.status(200).json(allUsers)
}

export const postTest = async (req: Request, res: Response) => {
    const {name} = req.body
    const newTest = new Test({name})
    try {
        await newTest.save();
        res.status(201).json(newTest)
    }  catch (error: any) {
        res.status(409).json({
            message: error.message
        });
    }
}