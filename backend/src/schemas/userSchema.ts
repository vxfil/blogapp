import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  isConfirmed: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
  username: { type: String, required: true, index: { unique: true } },
  avatar: { type: String, default: null },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  additionalInfo: { type: String, default: null },
});
