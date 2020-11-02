import IPostModel from '../interfaces/post_model_interface';

class AllPostsView {
  constructor() {
    this.renderMany = this.renderMany.bind(this);
  }

  private render(postWithUser: IPostModel) {
    return {
      post: {
        id: postWithUser.id,
        content: postWithUser.post,
        user: {
          username: postWithUser.user.username,
          email: postWithUser.user.email,
          image: {
            id: postWithUser.user.image.id,
            path: postWithUser.user.image.path,
          },
        },
      },
    };
  }

  public renderMany(allPosts: IPostModel[]) {
    return allPosts.map((post) => this.render(post));
  }
}

export default new AllPostsView();
