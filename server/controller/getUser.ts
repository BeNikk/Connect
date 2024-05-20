import { Request, Response } from "express";
import User from "../models/userModel";

export default async function getUser(req:Request,res:Response){
    try {
        const {username}=req.params;
        const user=await User.findOne({username:username});
        if(!user){
            return res.json({error:"No user found"});
        }
        return res.json(user);

        

    } catch (error) {
        return res.json({error:error});
    }
}