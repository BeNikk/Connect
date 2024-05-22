import { Request, Response } from "express";
import User from "../../models/userModel";
import Post from "../../models/postModel";

export default async function ReplyToPosts(req:Request,res:Response){
    try{
        const {id}=req.params;
        const {text}=req.body;
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"]) ){
            const userHeader=JSON.parse(req.headers["userId"]);
            const user=await User.findById(userHeader._id);
            if(!user){
                return res.json({message:"unauthorized"});
            }
            const post=await Post.findById(id);
            if(!post){
                return res.json({message:"No such post exists"});

            }
            if(!text){
                return res.json({message:"reply field is required"});
            }
            const profilePic=user.profilePicture;
            const username=user.username;
            const userProfilePic=user.profilePicture;
            const userId=user._id;
            const reply={text,profilePic,username,userProfilePic,userId};

            post.replies.push(reply);
           
            await post.save();
            return res.json(reply);
            
        }


    }
    catch(e){
        return res.json({message:"Error occured in commenting"});
    }
}