import { Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from "mongoose";
dotenv.config();

const jwtsecREt=process.env.JWT_SECRET || "ABC";

export default async function generateToken(username:string,res:Response) {
    try{

    

            const token=jwt.sign(username,jwtsecREt,{});
            res.cookie("token",token,{
                httpOnly:true,
                maxAge:15*24*60*60*1000,
                sameSite:"strict",

            })
            return token;
            

        
        
    }catch(e){
        console.log(`error in signing ${e}`);
    }


    
}