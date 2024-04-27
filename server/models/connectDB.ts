import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connection_string=process.env.MONGO_CONNECTION_URL;
export default async function connectDB(){
    try{
        if(connection_string){
            const connection=await mongoose.connect(connection_string);
            console.log(`mongodb connected ${connection}`);

        }
        else{
            console.log(`mongodb not connected`);
        }

    }catch(e){
        console.log(`error ${e}`);
    }
}