import UserModel from '../models/users_model';

export default interface IPostModel {
  id?: string;
  user?: UserModel;
  post: string;
}
