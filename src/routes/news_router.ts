import { Router } from 'express';

import newsController from '../controllers/news_controller';

const routes = Router();

routes.get('/', newsController.getNews);

export default routes;
