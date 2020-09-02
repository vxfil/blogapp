import { Schema } from 'mongoose';

export const TokenSchema = new Schema({
  token: { type: String },
});
