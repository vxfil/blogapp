import dotenv from 'dotenv';
import express from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserModel } from '../models/userModel';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
  secretOrKey: `${process.env.JWT}`,
};

export const jwtHeaderExtractor = (passport: any) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await UserModel.findById(payload.userId);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
};
