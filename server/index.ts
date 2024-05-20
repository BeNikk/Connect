import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './models/connectDB';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/userRoutes';
import postRouter from './routes/postRoute';
import {v2 as cloudinary} from 'cloudinary';
dotenv.config();

const cloudName=process.env.CLOUDINARY_CLOUD_NAME || ""
const apiKey=process.env.CLOUDINARY_API_KEY || ""
const apiSecret=process.env.CLOUDINARY_API_SECRET || ""
cloudinary.config({
    cloud_name:cloudName,
    api_key:apiKey,
    api_secret:apiSecret
})
const app=express();
const port=process.env.PORT;
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(express.urlencoded({limit:'50mb',extended:true}));
connectDB();

app.use('/api/user',userRouter);
app.use('/api/post',postRouter);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
