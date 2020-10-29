import { Router } from 'express';
import PostsController from '../controllers/posts_controller';

const postsController = new PostsController();
const routes = Router();

routes
  .get('/', postsController.getPosts)
  .get('/:id', postsController.getPostsFromUser)
  .post('/:userId/', postsController.createPostFromUser)
  .put('/:userId/:postId', postsController.putPostFromUser)
  .delete('/:userId/:postId', postsController.deletePostFromUser);

export default routes;
