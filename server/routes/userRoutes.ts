import express, { Request, Response } from 'express';
import signup from '../controller/Signup';
import Login from '../controller/Login';

const userRouter=express.Router();


userRouter.get('/test',(req:Request,res:Response)=>{
    res.json({message:"test route"});
})

userRouter.post('/signup',signup);
userRouter.post('/login',Login);

export {userRouter};