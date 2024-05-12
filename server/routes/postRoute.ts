import express from 'express';
import CreatePost from '../controller/postControllers/CreatePost';
import middleware from '../middleware/middleware';
const postRouter=express.Router();

postRouter.post('/create',middleware,CreatePost);
export default postRouter;

