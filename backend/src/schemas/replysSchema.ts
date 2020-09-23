import { Schema } from 'mongoose';

export const ReplysSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    commentId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String },
    avatar: { type: String },
    username: { type: String },
  },
  { timestamps: true }
);
