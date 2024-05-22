import { Request, Response } from "express"
import User from "../../models/userModel";
import Post from "../../models/postModel";

const getPostbyUsername = async(req:Request,res:Response) => {
  try {
    const {username}=req.params;
    const user=await User.findOne({username});
    if(!user){
        return res.json({error:"No such user exist"});
    }
    const posts=await Post.find({postedBy:user._id}).sort({createdAt:-1});
    return res.json(posts);
    
    
  } catch (error) {
    return res.json({error:error});
  }
}

export default getPostbyUsername
