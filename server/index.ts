import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './models/connectDB';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/userRoutes';
dotenv.config();
const app=express();
const port=process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
connectDB();

app.use('/api/user',userRouter);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
