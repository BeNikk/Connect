import express from 'express';
import CreatePost from '../controller/postControllers/CreatePost';
import middleware from '../middleware/middleware';
import Getposts from '../controller/postControllers/Getposts';
const postRouter=express.Router();

postRouter.post('/create',middleware,CreatePost);
postRouter.get('/:id',Getposts);
export default postRouter;

