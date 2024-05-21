import { Request, Response } from "express";
import User from "../../models/userModel";
import Post from "../../models/postModel";
import {v2 as cloudinary } from 'cloudinary';

export default async function CreatePost(req:Request,res:Response){
    try{
        
        const {text,postedBy,}=req.body;
        let {image}=req.body;
      
        
        if(!text && !image){
           return  res.json({error:"text or image is requird"});

        }
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){
            if(!postedBy){
              return  res.json({error:"Unauthorized"});
    
            }
            const userFromHeader=JSON.parse(req.headers["userId"]);
            const user=await User.findById(postedBy);
            if(!user){
               return res.json({error:"user not found"});
            }
            else{

                if(user._id.toString()!=userFromHeader._id.toString()){
                   return  res.json({error:"You cannot post for other user"});
                }
                if(image){
                    const uploadResponse=await cloudinary.uploader.upload(image);
                    image=uploadResponse.secure_url;
                }
                
                const newPost=new Post({text,image,postedBy});
                await newPost.save();
                return res.json({message:"new post successfulyl created"});
            }


        }

        
       
            
          
            
        

    }catch(e){
        console.log(e);
    return  res.json({error:"error in creating post"});
    }
}