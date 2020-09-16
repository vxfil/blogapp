import { model } from 'mongoose';
import { PostSchema } from '../schemas/postSchema';
import { IPost } from '../interfaces/post.interface';

export const PostModel = model<IPost>('Post', PostSchema);
