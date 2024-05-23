import { Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtsecREt=process.env.JWT_SECRET || "ABC";

export default  function generateToken(username:string,res:Response) {
    try{

    

            const token=jwt.sign(username,jwtsecREt,{});
            
            return token;
            

        
        
    }catch(e){
        console.log(`error in signing ${e}`);
        return res.json({message:"error occured in setting cookie"});
    }


    
}