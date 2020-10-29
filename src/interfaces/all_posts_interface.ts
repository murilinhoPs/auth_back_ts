import PostModel from '../models/post_model';

export default interface IAllPosts {
  username: string;
  image_url: string;
  userId: number;
  posts: Array<PostModel>;
}
