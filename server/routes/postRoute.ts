import express from 'express';
import CreatePost from '../controller/postControllers/CreatePost';
import middleware from '../middleware/middleware';
import Getposts from '../controller/postControllers/Getposts';
import DeletePosts from '../controller/postControllers/DeletePost';
import LikeUnlikePosts from '../controller/postControllers/LikeUnlikePosts';
import ReplyToPosts from '../controller/postControllers/ReplyToPosts';
import GetFeedPosts from '../controller/postControllers/GetFeedPosts';
const postRouter=express.Router();

postRouter.post('/create',middleware,CreatePost);
postRouter.get('/post/:id',Getposts);
postRouter.delete('/post/:id',middleware,DeletePosts);
postRouter.post('/like/:id',middleware,LikeUnlikePosts);
postRouter.post('/reply/:id',middleware,ReplyToPosts);
postRouter.get('/feed',middleware,GetFeedPosts);
export default postRouter;

