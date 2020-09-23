import { Document } from 'mongoose';

export interface IReplys extends Document {
  userId: String;
  commentId: String;
  content: String;
  avatar: String;
  username: String;
  createdAt: Date;
  updatedAt: Date;
}
