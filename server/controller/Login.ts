import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import { ObjectId } from "mongoose";
import generateToken from "../helpers/setCookie";

interface userInterface{
    _id:ObjectId,
    username:string,
    password:string,
    bio:string,
    name:string,
    profilePic:string,
    followers:[string],
    followings:[string],

}
export default async function Login(req:Request,res:Response){
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(user){

            const isPasswordCorrect=await bcrypt.compare(password,user.password);
            if(isPasswordCorrect){
                generateToken(username,res);
                res.json({
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    name:user.name,
                    password:user.password,
                    bio:user.bio,
                    profilePicture:user.profilePicture,
                    message:"Logged in successfully"

                });

            }else{
                return res.status(400).json({error:"Password incorrect"});
            }
        }else{
           return  res.status(400).json({error:"No User Found"});
        }
        



    }catch(e){
        console.log(`error occured ${e}`);
       return  res.status(500).json({error:e});
    }
}