import { Schema } from 'mongoose';

export const CodeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  expiredAt: { type: Date, required: true },
});
