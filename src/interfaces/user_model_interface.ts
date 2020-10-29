import IBioModel from './bio_model_interface';
import IImageModel from './image_model_interface';
import IPostModel from './post_model_interface';
import IRefreshToken from './refresh_token_interface';

export default interface IUserModel {
  id?: number;
  username: string;
  email: string;
  password: string;
  image?: IImageModel;
  bio: IBioModel;
  posts: Array<IPostModel>;
  refreshToken: IRefreshToken;
}
