import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

import { UserModel } from '../models/userModel';

export const uploadAvatar = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { image, _id } = req.body;
    const uploaded = await cloudinary.uploader.upload(image);
    await UserModel.findByIdAndUpdate(_id, { avatar: uploaded.url });
    return res.send(uploaded.url);
  } catch (error) {
    console.log(error);
    res.status(500).send('Failure');
  }
};

export const updateProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { data, _id } = req.body;
    const entries = Object.entries(data);
    // empty fields filter
    const result = entries.reduce(
      (acc, item): any => (item[1] ? { ...acc, [item[0]]: item[1] } : acc),
      {}
    );
    await UserModel.findByIdAndUpdate(_id, result);
    res.send('Success, data is updated!');
  } catch (err) {
    console.error(err);
  }
};

export const profileInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id).select([
      'username',
      'firstName',
      'lastName',
      'avatar',
      'additionalInfo',
    ]);
    res.send(user);
  } catch (err) {
    res.status(404).send('Something went wrong!');
  }
};
