import IUserModel from '../../dist/interfaces/user_model_interface';
import PostModel from '../models/post_model';

export default interface IAllPosts {
  id: number;
  content: string;
  user: IUserModel;

  // username: string;
  // image_url: string;
  // userId: number;
  // posts: Array<PostModel>;
}
