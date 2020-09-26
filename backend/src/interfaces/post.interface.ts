import { Document } from 'mongoose';

export interface IPost extends Document {
  userId: String;
  content: String;
  likes: Array<String>;
  createdAt: Date;
  updatedAt: Date;
}
