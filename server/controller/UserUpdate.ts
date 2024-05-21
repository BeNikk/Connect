import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import {v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
const cloudName=process.env.CLOUDINARY_CLOUD_NAME ||""
const apiKey=process.env.CLOUDINARY_API_KEY || ""
const apiSecret=process.env.CLOUDINARY_API_SECRET || ""
cloudinary.config({
    cloud_name:cloudName,
    api_key:apiKey,
    api_secret:apiSecret
})
export default async function UserUpdate(req:Request,res:Response){
    try{
        const{name,username,email,password,bio}=req.body;
        let {profilePicture}=req.body;
        
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){

            


            const currentUser=JSON.parse(req.headers["userId"]);
            if(req.params.id!=(currentUser._id).toString()){
               return res.json({error:"you cannot update other person's profile"});
            }
            const currentUserId=currentUser._id;
            let user=await User.findById(currentUserId);
            if(!user){
               return res.json({error:"user not found"});

            }
            if(password && user){
                const salt=await bcrypt.genSalt(10);
                const hashedPassword=await bcrypt.hash(password,salt);
                user.password=hashedPassword;



            }
            if(profilePicture){
                if(user.profilePicture){
                    let img=user.profilePicture.split("/").pop()
                    if(img){

                        await cloudinary.uploader.destroy(img.split(".")[0]);
                    }
                }
                const uploadResponse=await cloudinary.uploader.upload(profilePicture);
                profilePicture=uploadResponse.secure_url;
            }
            if(user){

                user.name=name || user.name;
                user.email=email || user.email;
                user.username=username || user.username;
                user.profilePicture=profilePicture || user.profilePicture;
                user.bio=bio || user.bio;
                user._id=user._id;
                user=await user.save();
             return   res.json(user);

            }
            


        }

    }catch(e){
       return res.json({error:"error in updating the user"})
    }
}