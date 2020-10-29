import UserModel from '../models/users_model';

export default interface IRefreshToken {
  id?: number;
  user?: UserModel;
  token: string;
}
