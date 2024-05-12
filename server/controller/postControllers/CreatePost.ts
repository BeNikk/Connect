import { Request, Response } from "express";
import User from "../../models/userModel";
import Post from "../../models/postModel";

export default async function CreatePost(req:Request,res:Response){
    try{
        
        const {postedBy,text,image}=req.body;
        if(!postedBy){
            res.json({message:"posted by field is required"});

        }
        if(!text && !image){
            res.json({message:"text or image is requird"});

        }
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){
            const userFromHeader=JSON.parse(req.headers["userId"]);
            const user=await User.findById(postedBy);
            if(!user){
                res.json({message:"user not found"});
            }
            else{

                if(user._id.toString()!=userFromHeader._id.toString()){
                    res.json({message:"You cannot post for other user"});
                }
                
                const newPost=new Post({text,image,postedBy});
                await newPost.save();
                res.json({message:"new post successfulyl created"});
            }


        }

        
       
            
          
            
        

    }catch(e){
        console.log(e);
        res.json({message:"error in creating post"});
    }
}