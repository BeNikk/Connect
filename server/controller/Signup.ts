import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import generateToken from "../helpers/setCookie";
export default async function signup(req:Request,res:Response){
    try{
        const {name,username,email,password}=req.body;
        const user=await User.findOne({$or:[{username},{email}]});
        if(user){
           return res.status(400).json({message:"User already exists"});

        }
        else{

            const salt=await bcrypt.genSalt(10);
            const hashedpassword=await bcrypt.hash(password,salt);
            const newUser=new User({
                name,
                username,
                email,
                password:hashedpassword
            });
            await newUser.save();
            if(newUser){
                generateToken(newUser.username,res);
               return res.status(200).json({
                    id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                    password:newUser.password,
                    username:newUser.username
                });
            }else{
             return   res.status(400).json({message:"Invalid user data"});
            }
        }


    }catch(e){
        console.log(`error ${e}`);
      return  res.status(500).send(`Error in the server`);
    }
}