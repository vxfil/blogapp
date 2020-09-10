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
  console.log(req.body);
  // try {
  //   const { image } = req.body;
  //   const uploaded = await cloudinary.uploader.upload(image);
  //   return res.send(uploaded.url);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send('Failure');
  // }
};
