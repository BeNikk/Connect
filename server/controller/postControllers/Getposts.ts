import { Request, Response } from "express";
import Post from "../../models/postModel";

export default async function Getposts(req:Request,res:Response){
    try{
        const {id}=req.params;
        const post=await Post.findById(id);
        if(!post){
            return res.status(404).json({error:"post not found"});

        }
        else{
            return res.status(200).json(post);

        }

    }catch(e){
        return res.json({error:"error in getting the post"});
    }
}