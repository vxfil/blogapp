import { Document } from 'mongoose';

export interface ICode extends Document {
  userId: String;
  code: String;
  expiredAt: Date;
}
