import UserModel from '../models/users_model';

export default interface IImageModel {
  id?: number;
  user?: UserModel;
  path: string;
}
