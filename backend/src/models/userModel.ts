import { model } from 'mongoose';
import { UserSchema } from '../schemas/userSchema';
import { IUser } from '../interfaces/user.interface';

export const UserModel = model<IUser>('User', UserSchema);
