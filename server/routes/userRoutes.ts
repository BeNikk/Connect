import express, { Request, Response } from 'express';

const userRouter=express.Router();


userRouter.get('/test',(req:Request,res:Response)=>{
    res.json({message:"test route"});


})

export {userRouter};