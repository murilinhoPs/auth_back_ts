import IAllPosts from '../interfaces/all_posts_interface';

class AllPostsView {
  constructor() {
    this.renderMany = this.renderMany.bind(this);
  }

  private render(usersWithPosts: IAllPosts) {
    return {
      user: {
        id: usersWithPosts.userId,
        username: usersWithPosts.username,
        image_url: `${process.env.HOST}/uploads/${usersWithPosts.image_url}`,
        posts: usersWithPosts.posts,
      },
    };
  }

  public renderMany(allPosts: IAllPosts[]) {
    return allPosts.map((post) => this.render(post));
  }
}

export default new AllPostsView();
