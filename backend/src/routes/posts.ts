import express from 'express';
import * as PostsController from '../controllers/postsController';
import pasport from 'passport';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postsRouter = express.Router();

postsRouter.post(
  '/upload_image',
  upload.single('upload'),
  PostsController.uploadImage
);

postsRouter.post(
  '/create_post',
  pasport.authenticate('jwt', { session: false }),
  PostsController.createPost
);

postsRouter.get(
  '/get_posts',
  pasport.authenticate('jwt', { session: false }),
  PostsController.getPosts
);

postsRouter.get(
  '/get_post/:id',
  pasport.authenticate('jwt', { session: false }),
  PostsController.getPost
);

postsRouter.post(
  '/write_comment',
  pasport.authenticate('jwt', { session: false }),
  PostsController.writeComment
);

postsRouter.get(
  '/get_comments/:postId',
  pasport.authenticate('jwt', { session: false }),
  PostsController.getComments
);

postsRouter.patch(
  '/update_comment',
  pasport.authenticate('jwt', { session: false }),
  PostsController.updateComment
);

postsRouter.patch(
  '/likes_handler',
  pasport.authenticate('jwt', { session: false }),
  PostsController.likesHandler
);

export default postsRouter;
