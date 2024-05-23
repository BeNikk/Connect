import { Request, Response } from "express";
import User from "../../models/userModel";
import Post from "../../models/postModel";

export default async function GetFeedPosts(req:Request,res:Response){
    try{
              
        
           
            const feedposts=await Post.find({}).sort({createdAt:-1});

                return res.json(feedposts);
           

        }

    
    catch(e){
        return res.json({message:"error in getting the feed"});
    }
}