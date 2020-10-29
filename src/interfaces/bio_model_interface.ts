import UserModel from '../models/users_model';

export default interface IBioModel {
  id?: number;
  user?: UserModel;
  content: string;
}
