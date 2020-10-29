import { Router } from 'express';
import verifyJWT from '../config/security';

import newsRoutes from './news_router';
import userRoutes from './user_router';
import postsRoutes from './posts_routes';
import authRoutes from './auth_routes';

const routes = Router();

routes
  .use('/auth', authRoutes)
  .use('/users', userRoutes)
  .use('/news', verifyJWT, newsRoutes)
  .use('/posts', verifyJWT, postsRoutes);

export default routes;
