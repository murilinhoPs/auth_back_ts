import INewsModel from '../interfaces/news_model_interface';

class NewsView {
  constructor() {
    this.renderMany = this.renderMany.bind(this);
  }

  private render(news: INewsModel) {
    return {
      user: {
        name: news.user.name,
        profile_picture:
          'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg',
      },
      message: {
        content: news.message.content,
        created_at: news.message.created_at,
      },
    };
  }

  public renderMany(allNews: INewsModel[]) {
    return allNews.map((news) => this.render(news));
  }
}

export default new NewsView();
