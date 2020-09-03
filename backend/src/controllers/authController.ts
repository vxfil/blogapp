import express from 'express';
import nodemailer from 'nodemailer';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UserModel } from '../models/userModel';
import { CodeModel } from '../models/codeModel';
import { TokenModel } from '../models/tokenModel';

dotenv.config();

const getRandomInt = (min: number, max: number): string => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min)) + min;
  return result.toString();
};

const sendEmail = (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mail.blogapp@gmail.com',
      pass: '173456Zxc',
    },
  });

  const mailOptions = {
    from: 'mail.blogapp@gmail.com',
    to: `${email}`,
    subject: 'Confirmation of registration',
    html: `<p>Please confirm registration and enter the received code on the website
    <br/><b>${code}</b></p>`,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const createAccessToken = (userId: string): string => {
  const token = jwt.sign(
    {
      userId: userId,
    },
    `${process.env.JWT}`,
    { expiresIn: '10m' }
  );
  return token;
};

const createRefreshToken = (userId: string): string => {
  const token = jwt.sign(
    {
      userId: userId,
    },
    `${process.env.REFRESH}`,
    { expiresIn: '1d' }
  );
  return token;
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const randomCode = getRandomInt(100000, 999999);
  const data = req.body;
  const salt = bcrypt.genSaltSync(10);
  const password = data.password;
  const user = new UserModel({
    email: data.email,
    isConfirmed: data.isConfirmed,
    password: bcrypt.hashSync(password, salt),
    username: data.username,
  });
  user
    .save()
    .then((userRes) => {
      const confirmationCode = new CodeModel({
        userId: userRes._id,
        code: randomCode,
        expiredAt: moment().add(15, 'minutes'),
      });
      confirmationCode
        .save()
        .then(() => {
          sendEmail(userRes.email, randomCode);
          return res.send(userRes);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      if (err.keyValue.username) {
        return res
          .status(403)
          .send(`Username ${err.keyValue.username} is busy`);
      }
      if (err.keyValue.email) {
        return res
          .status(403)
          .send('This email is already in use in the system');
      }
      res.status(403).send(err);
    });
};

export const registerConfirm = async (
  req: express.Request,
  res: express.Response
) => {
  const { code, userId } = req.body;
  CodeModel.findOne({ code, userId })
    .then((data) => {
      if (data === null) {
        console.log(data);
        return res.send({ error: 'Wrong code' });
      }
      const { expiredAt } = data;
      if (moment() > moment(expiredAt)) {
        return res.send({ error: 'Code was expired' });
      }
      UserModel.findByIdAndUpdate(userId, { isConfirmed: true }, { new: true })
        .then((response) => res.send(response))
        .catch((err) => console.log(err));
    })
    .catch((err) => res.send(err));
};

export const resendCode = async (
  req: express.Request,
  res: express.Response
) => {
  const { _id } = req.body;
  UserModel.findById(_id).then((res) => {
    if (!res) {
      return console.log('User was not found');
    }
    const email = res.email;
    const randomCode = getRandomInt(100000, 999999);
    const confirmationCode = new CodeModel({
      userId: _id,
      code: randomCode,
      expiredAt: moment().add(15, 'minutes'),
    });
    confirmationCode
      .save()
      .then(() => {
        return sendEmail(email, randomCode);
      })
      .catch((err) => console.log(err));
  });
};

export const authentication = async (
  req: express.Request,
  res: express.Response
) => {
  const user = await UserModel.findOne({
    email: req.body.email,
    isConfirmed: true,
  });
  if (user) {
    const password = await bcrypt.compare(req.body.password, user.password);
    if (password) {
      const accessToken = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);
      new TokenModel({ token: refreshToken })
        .save()
        .catch((err) => console.log(err));
      return res.send({ accessToken, refreshToken, _id: user._id });
    } else {
      return res.status(401).send('Wrong password');
    }
  } else {
    return res
      .status(404)
      .send(
        'User with this email address does not exist or registration is not confirmed'
      );
  }
};

export const generateRefreshToken = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(403).send({ error: 'Access denied, token missing!' });
    } else {
      const tokenDoc = await TokenModel.findOne({ token: refreshToken });
      if (!tokenDoc) {
        return res.status(401).send({ error: 'Token expired!' });
      } else {
        // как то решить ошибку
        const payload: any = jwt.verify(tokenDoc.token, process.env.REFRESH!);
        console.log('PAYLOAD: ', payload);
        const userId: any = payload.userId;
        const accessToken = jwt.sign({ userId: userId }, process.env.JWT!, {
          expiresIn: '10m',
        });
        return res.send({ accessToken });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Internal Server Error!' });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const { refreshToken } = req.body;
    await TokenModel.findOneAndDelete({ token: refreshToken });
    return res.send({ success: 'User logged out!' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Internal Server Error!' });
  }
};
