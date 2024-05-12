import { Request, Response } from "express";
import User from "../../models/userModel";
import Post from "../../models/postModel";

export default async function GetFeedPosts(req:Request,res:Response){
    try{
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){
            const userHeader=JSON.parse(req.headers["userId"]);
            const user=await User.findById(userHeader._id);
            if(!user){
                return res.json({message:"unauthorized"});

            }
            const following =user.following;
            const feedposts=await Post.find({postedBy:{$in:following}}).sort({createdAt:-1});
            return res.json(feedposts);

        }

    }
    catch(e){
        return res.json({message:"error in getting the feed"});
    }
}