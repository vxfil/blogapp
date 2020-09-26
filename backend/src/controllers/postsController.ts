import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { PostModel } from '../models/postModel';
import { UserModel } from '../models/userModel';
import { CommentModel } from '../models/commentModel';

export const uploadImage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { buffer, mimetype } = req.file;
    const data = buffer.toString('base64');
    const uri = `data:${mimetype};base64,${data}`;
    const uploaded = await cloudinary.uploader.upload(uri);
    return res.json({ url: uploaded.url });
  } catch (err) {
    console.log(err);
    res.status(500).send('Failure');
  }
};

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, content, preview } = req.body;
    const saved = await new PostModel({
      userId,
      content,
      preview,
    }).save();
    console.log(saved);
    res.send(saved);
  } catch (err) {
    console.log(err);
    res.status(501).send('Something went wrong!');
  }
};

export const getPosts = async (req: express.Request, res: express.Response) => {
  const { p, l } = req.query;
  const page = Number(p);
  const limit = Number(l);
  try {
    const posts = await PostModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select(['preview', 'createdAt', 'userId', '_id', 'likes'])
      .exec();

    const count = await PostModel.countDocuments();

    res.send({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const getPost = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const post = await PostModel.findById(id).select([
      'content',
      'userId',
      'createdAt',
      'likes',
    ]);
    const userId = post?.userId;
    const userInfo = await UserModel.findById(userId).select([
      'avatar',
      'username',
    ]);
    res.send({
      content: post?.content,
      date: post?.createdAt,
      avatar: userInfo?.avatar,
      username: userInfo?.username,
      likes: post?.likes,
    });
  } catch (err) {
    res.status(403).send(err);
  }
};

export const writeComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, postId, content } = req.body;
    const user = await UserModel.findById(userId).select([
      'avatar',
      'username',
    ]);
    const saved = await new CommentModel({
      userId,
      postId,
      content,
      avatar: user?.avatar,
      username: user?.username,
    }).save();
    res.send(saved);
  } catch (err) {
    console.log(err);
  }
};

export const getComments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { postId } = req.params;
    const comments = await CommentModel.find({ postId });
    res.send({ comments });
  } catch (err) {
    console.log(err);
  }
};

export const updateComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { commentId } = req.body;
    await CommentModel.findByIdAndUpdate(commentId, {
      $push: { replys: req.body },
    });
    const comment = await CommentModel.findById(commentId);
    const lastReply = comment?.replys[comment.replys.length - 1];
    res.send(lastReply);
  } catch (err) {
    console.log(err);
  }
};

export const likesHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, postId, actionType } = req.body;
    console.log(actionType);
    if (actionType === 'increment') {
      await PostModel.findByIdAndUpdate(postId, {
        $push: { likes: userId },
      });
      res.send('liked!');
    } else if (actionType === 'decrement') {
      await PostModel.findByIdAndUpdate(postId, {
        $pull: { likes: userId },
      });
      res.send('disliked!');
    }
  } catch (err) {
    console.log(err);
  }
};
