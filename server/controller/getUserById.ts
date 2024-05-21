import { Request, Response } from "express";
import User from "../models/userModel";

export default async function getUserById(req:Request,res:Response){
    try {
        const {userId}=req.params;
        const user=await User.findById(userId).select("-password");
        if(!user){
            return res.json({error:"No user found"});
        }
        return res.json(user);

        

    } catch (error) {
        return res.json({error:error});
    }
}