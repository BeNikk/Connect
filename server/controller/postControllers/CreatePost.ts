import { Request, Response } from "express";
import User from "../../models/userModel";
import Post from "../../models/postModel";

export default async function CreatePost(req:Request,res:Response){
    try{
        
        const {postedBy,text,image}=req.body;
        
        if(!text && !image){
           return  res.json({message:"text or image is requird"});

        }
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){
            if(!postedBy){
              return  res.json({message:"posted by field is required"});
    
            }
            const userFromHeader=JSON.parse(req.headers["userId"]);
            const user=await User.findById(postedBy);
            if(!user){
               return res.json({message:"user not found"});
            }
            else{

                if(user._id.toString()!=userFromHeader._id.toString()){
                   return  res.json({message:"You cannot post for other user"});
                }
                
                const newPost=new Post({text,image,postedBy});
                await newPost.save();
                return res.json({message:"new post successfulyl created"});
            }


        }

        
       
            
          
            
        

    }catch(e){
        console.log(e);
       return  res.json({message:"error in creating post"});
    }
}