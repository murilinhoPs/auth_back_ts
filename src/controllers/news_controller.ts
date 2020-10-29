import { Request, Response } from 'express';
import axios from 'axios';
import INewsModel from '../interfaces/news_model_interface';
import NewsView from '../views/news_view';

class NewsController {
  public url: string = 'https://gb-mobile-app-teste.s3.amazonaws.com/data.json';

  public constructor() {
    this.getNews = this.getNews.bind(this);
  }

  public async getNews(req: Request, res: Response) {
    // if (!req.body.refreshToken) return res.sendStatus(403);

    try {
      const newsResponse = await axios.get(this.url);

      const newsResponseData: Array<INewsModel> = newsResponse.data.news;

      res
        .status(newsResponse.status)
        .send(NewsView.renderMany(newsResponseData));
    } catch (err) {
      return res.status(400).json({
        message: 'Não conseguiu conectar com o serviço, a url de noticias',
        error: err,
      });
    }
  }
}

export default new NewsController();
