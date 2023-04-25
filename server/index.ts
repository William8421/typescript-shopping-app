import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv';
import {connectDB} from './helper/dbConnect';
import mongoose from 'mongoose';
import cors from 'cors';

import testRouter from './routes/testRouter'
import userRouter from './routes/userRouter'
import shoppingItemsRouter from './routes/shoppingItemsRouter';

dotenv.config()
const app: Express = express()

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.json('Express + TypeScript Server')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  connectDB()
  mongoose.connection.on('open', () => {
    console.log('connected to DB');
  })
  mongoose.connection.on('error', (error) => {
    console.log('connection to DB has failed', error.message);
    
  })

  app.use(cors())
  app.use(express.json())

  app.use('/test', testRouter)
  app.use('/user', userRouter)
  app.use('/items', shoppingItemsRouter)
