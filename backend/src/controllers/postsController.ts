import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { PostModel } from '../models/postModel';

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
  console.log(p, l);
  const page = Number(p);
  const limit = Number(l);
  try {
    const posts = await PostModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
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
    const post = await PostModel.findById(id).select('content');
    res.send(post);
  } catch (err) {
    res.status(403).send(err);
  }
};
