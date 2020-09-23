import { model } from 'mongoose';
import { CommentSchema } from '../schemas/commentSchema';
import { IComment } from '../interfaces/comment.interface';

export const CommentModel = model<IComment>('Comment', CommentSchema);
