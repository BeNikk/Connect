import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import generateToken from "../helpers/setCookie";
export default async function signup(req:Request,res:Response){
    try{
        const {name,username,email,password}=req.body;
        const user=await User.findOne({$or:[{username},{email}]});
        if(user){
           return res.status(400).json({error:"User already exists"});

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
              const token=  generateToken(newUser.username,res);
              console.log("signup page");
              console.log(token);
               return res.status(200).json({
                    _id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                    password:newUser.password,
                    username:newUser.username,
                    message:"Succesfully signed up",
                    token:token
                });
            }else{
             return   res.status(400).json({error:"Invalid user data"});
            }
        }


    }catch(e){
        console.log(`error ${e}`);
      return  res.status(500).send(`Error in the server`);
    }
}