import IPostModel from '../interfaces/post_model_interface';

class PostsView {
  constructor() {
    this.renderMany = this.renderMany.bind(this);
  }

  private render(post: IPostModel) {
    return {
      post: {
        id: post.id,
        post: post.post,
      },
    };
  }

  public renderMany(allPosts: IPostModel[]) {
    return allPosts.map((post) => this.render(post));
  }
}

export default new PostsView();
