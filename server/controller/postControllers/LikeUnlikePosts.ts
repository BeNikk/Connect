import { Request, Response } from "express";
import User from "../../models/userModel";
import Post from "../../models/postModel";

export default async function LikeUnlikePosts(req:Request,res:Response){
    try{
        const {id}=req.params;
       

        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){
          
            const userHeader=JSON.parse(req.headers["userId"]);
            const user=await User.findById(userHeader._id);
            if(!user){
                return res.json({message:"Unauthorized"});
            }
            else{
                const post=await Post.findById(id);
                if(!post){
                    return res.json({message:"no such post exist"});
                }
                
                const liked= post.likes.includes(user._id);
                if(liked){
                    await Post.findByIdAndUpdate(post._id,{$pull:{likes:user._id}});
                    return res.json({message:"Post unliked"});


                }else{
                    console.log("i am here");
                    await Post.findByIdAndUpdate(post._id,{$push:{likes:user._id}});
                    return res.json({message:"post liked"});


                }

            }
        }



    }
    catch(e){
        return res.json({message:"Error in liking/unliking"});
    }
}