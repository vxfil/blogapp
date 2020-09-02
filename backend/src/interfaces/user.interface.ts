import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  isConfirmed: boolean;
  password: string;
  username: string;
  avatar: string;
  firstName: string;
  lastName: string;
  additionalInfo: string;
}
