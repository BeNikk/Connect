import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
export default async function signup(req:Request,res:Response){
    try{
        const {name,username,email,password}=req.body;
        const user=await User.findOne({$or:[{username},{email}]});
        if(user){
            res.status(400).json({message:"User already exists"});
        }
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
            res.status(200).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                password:newUser.password,
                username:newUser.username
            });
        }


    }catch(e){
        console.log(`error ${e}`);
        res.status(500).send(`Error in the server`);
    }
}