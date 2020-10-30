import UserModel from '../models/users_model';

export default interface IPostModel {
  id?: number;
  user?: UserModel;
  post: string;
}
