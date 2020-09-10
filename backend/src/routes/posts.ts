import express from 'express';
import * as PostsController from '../controllers/postsController';
import pasport from 'passport';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postsRouter = express.Router();

postsRouter.get(
  '/posts',
  pasport.authenticate('jwt', { session: false }),
  PostsController.posts
);

postsRouter.post(
  '/upload_image',
  pasport.authenticate('jwt', { session: false }),
  upload.single('upload'),
  PostsController.uploadImage
);

export default postsRouter;
