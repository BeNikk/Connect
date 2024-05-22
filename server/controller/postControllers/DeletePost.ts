import { Request, Response } from "express";
import User from "../../models/userModel";
import Post from "../../models/postModel";
import { v2 as cloudinary } from "cloudinary";
export default async function DeletePosts(req:Request,res:Response){
    try{
        const {id}=req.params;
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){
            const userHeader=JSON.parse(req.headers["userId"]);
            const user=await User.findById(userHeader._id);
            const post=await Post.findById(id);
            if(!post){
                return res.json({message:"no post found"});
            }
            if(post.image){
             const imgMod=post.image.split("/");
             const imageId=imgMod.pop()?.split(".")[0];
             if(imageId){

                 await cloudinary.uploader.destroy(imageId);
             }
            }
            if(!user || (user._id.toString()!=post?.postedBy.toString())){
                return res.json({message:"unauthorized"});
            }
            
                await Post.findByIdAndDelete(id);
                return res.json({message:"post deleted successfully"});
            

        }

    }
    catch(e){
        return res.json({message:"error occured in deleting the post",e});
    }
}