import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import { v2 as cloudinary } from 'cloudinary';

import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import pfofileRouter from './routes/profile';
import { jwtHeaderExtractor } from './middleware/passport';

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const DBASE = process.env.DBASE;

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

app.use(passport.initialize());
jwtHeaderExtractor(passport);

app.use(cors());
app.use(express.static('public'));
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
  })
);

app.use('/auth', authRouter);
app.use('/main', postsRouter);
app.use('/profile', pfofileRouter);

mongoose.connect(`${DBASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => console.log(`app is listening on the port ${PORT}`));
