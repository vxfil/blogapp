import { model } from 'mongoose';
import { TokenSchema } from '../schemas/tokenSchema';
import { IToken } from '../interfaces/token.interface';

export const TokenModel = model<IToken>('Token', TokenSchema);
