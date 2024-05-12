import { Request, Response } from "express";

export default async function Logout(req:Request,res:Response){
    try{
       return res.clearCookie('token').json({message:"Logged out successfully"});

    }catch(e){
      return  res.status(500).json({message:`some error occured ${e}`});
    }
}