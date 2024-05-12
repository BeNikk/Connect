import express from 'express';
import CreatePost from '../controller/postControllers/CreatePost';
import middleware from '../middleware/middleware';
import Getposts from '../controller/postControllers/Getposts';
import DeletePosts from '../controller/postControllers/DeletePost';
import LikeUnlikePosts from '../controller/postControllers/LikeUnlikePosts';
const postRouter=express.Router();

postRouter.post('/create',middleware,CreatePost);
postRouter.get('/:id',Getposts);
postRouter.delete('/:id',middleware,DeletePosts);
postRouter.post('/like/:id',middleware,LikeUnlikePosts);
export default postRouter;

