import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes';

const app=express();
const port=3000;
app.use(cors());

app.use('/',userRouter);

app.listen(3000,()=>{
    console.log(`App running on port ${port}`);

})