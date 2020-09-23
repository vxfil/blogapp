import { Schema } from 'mongoose';

import { ReplysSchema } from './replysSchema';

export const CommentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String },
    avatar: { type: String },
    username: { type: String },
    replys: { type: [ReplysSchema] },
  },
  { timestamps: true }
);
