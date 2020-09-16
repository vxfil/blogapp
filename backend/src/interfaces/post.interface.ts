import { Document } from 'mongoose';

export interface IPost extends Document {
  userId: String;
  content: String;
  createdAt: Date;
  updatedAt: Date;
}
