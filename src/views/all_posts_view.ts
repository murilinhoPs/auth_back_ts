import IPostModel from '../../dist/interfaces/post_model_interface';
import IAllPosts from '../interfaces/all_posts_interface';

class AllPostsView {
  constructor() {
    this.renderMany = this.renderMany.bind(this);
  }

  private render(postWithUser: IPostModel) {
    return {
      post: {
        id: postWithUser.id,
        content: postWithUser.post,
        user: postWithUser.user,
      },
    };
  }

  public renderMany(allPosts: IPostModel[]) {
    return allPosts.map((post) => this.render(post));
  }
}

export default new AllPostsView();
