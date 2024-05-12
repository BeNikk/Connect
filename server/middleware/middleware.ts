import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/userModel";
dotenv.config();
const secret=process.env.JWT_SECRET || "";
const middleware = async(req:Request,res:Response,next:NextFunction) => {
  try{
    const token=req.cookies.token;
    if(token){
        const verified= jwt.verify(token,secret);
        
        const user=await User.findOne({username:verified});
       // console.log(verified);

        if(!user){
            return res.status(403);
        }
        if(typeof user==="string"){
            return res.status(403);
        }
        
          req.headers["userId"]=JSON.stringify(user);

          next();
        











        
        
        
    }
    else{
        res.json({message:`Unauthorized`});
    }

  } catch(e){
    console.log(`error occured`);
    res.json({error:e});
  } 
}

export default middleware
