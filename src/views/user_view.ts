import IUserModel from '../interfaces/user_model_interface';
import BioView from './bio_view';
import ImageView from './image_view';
import PostsView from './posts_view';

class UserView {
  constructor() {
    this.renderMany = this.renderMany.bind(this);
  }

  public render(user: IUserModel) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      image: ImageView.render(user.image),
      posts: PostsView.renderMany(user.posts),
      bio: BioView.render(user.bio),
    };
  }

  public renderMany(users: IUserModel[]) {
    return users.map((user) => this.render(user));
  }
}

export default new UserView();
