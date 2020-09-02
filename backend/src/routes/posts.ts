import express from 'express';
import * as PostsController from '../controllers/postsController';
import pasport from 'passport';

const postsRouter = express.Router();

postsRouter.get(
  '/posts',
  pasport.authenticate('jwt', { session: false }),
  PostsController.posts
);

export default postsRouter;
