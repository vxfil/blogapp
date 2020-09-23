import { Document } from 'mongoose';

import { IReplys } from './replys.interface';

export interface IComment extends Document {
  userId: String;
  postId: String;
  content: String;
  avatar: String;
  username: String;
  createdAt: Date;
  updatedAt: Date;
  replys: Array<IReplys>;
}
