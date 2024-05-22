import express from 'express';
import CreatePost from '../controller/postControllers/CreatePost';
import middleware from '../middleware/middleware';
import Getposts from '../controller/postControllers/Getposts';
import DeletePosts from '../controller/postControllers/DeletePost';
import LikeUnlikePosts from '../controller/postControllers/LikeUnlikePosts';
import ReplyToPosts from '../controller/postControllers/ReplyToPosts';
import GetFeedPosts from '../controller/postControllers/GetFeedPosts';
import getPostbyUsername from '../controller/postControllers/getPostbyUsername';
const postRouter=express.Router();

postRouter.post('/create',middleware,CreatePost);
postRouter.get('/post/:id',Getposts);
postRouter.delete('/post/:id',middleware,DeletePosts);
postRouter.put('/like/:id',middleware,LikeUnlikePosts);
postRouter.put('/reply/:id',middleware,ReplyToPosts);
postRouter.get('/feed',middleware,GetFeedPosts);
postRouter.get('/userpost/:username',getPostbyUsername);
export default postRouter;

