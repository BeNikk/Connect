import { Request, Response } from "express";
import Post from "../../models/postModel";

export default async function Getposts(req:Request,res:Response){
    try{
        const {id}=req.params;
        const post=await Post.findById(id);
        if(!post){
            return res.status(404).json({message:"post not found"});

        }
        else{
            res.status(200).json({post});

        }

    }catch(e){
        console.log('error in getting post');
        return res.json({messsage:"error in getting the post"});
    }
}