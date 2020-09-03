import { model } from 'mongoose';
import { CodeSchema } from '../schemas/codeSchema';
import { ICode } from '../interfaces/code.interface';

export const CodeModel = model<ICode>('Code', CodeSchema);
