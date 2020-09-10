import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

export const posts = async (req: express.Request, res: express.Response) => {
  const posts = [
    {
      title: 'post 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'post 2',
      content:
        'Eu volutpat odio facilisis mauris sit amet massa. Blandit volutpat maecenas volutpat blandit. Et netus et malesuada fames ac.',
    },
    {
      title: 'post 3',
      content:
        'Sagittis orci a scelerisque purus semper eget duis. Morbi leo urna molestie at elementum eu facilisis.',
    },
    {
      title: 'post 4',
      content:
        'Pellentesque dignissim enim sit amet venenatis. Viverra nibh cras pulvinar mattis nunc sed.',
    },
    {
      title: 'post 5',
      content:
        'Dapibus ultrices in iaculis nunc sed. Nibh tellus molestie nunc non.',
    },
  ];
  res.send({ posts });
};

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
