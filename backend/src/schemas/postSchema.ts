import { Schema } from 'mongoose';

export const PostSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    preview: { type: String },
  },
  { timestamps: true }
);
