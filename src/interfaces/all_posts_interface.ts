import PostModel from '../models/post_model';
import IUserModel from './user_model_interface';

export default interface IAllPosts {
  id: number;
  content: string;
  user: IUserModel;
}
