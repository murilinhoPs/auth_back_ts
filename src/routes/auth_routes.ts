import { Router } from 'express';
import verifyJWT from '../config/security';
import AuthController from '../controllers/auth_controller';

const authController = new AuthController();
const routes = Router();

routes
  .post('/login', authController.authUser)
  // .get('/token', authController.refreshAccessToken)
  .delete('/logout/:id', verifyJWT, authController.logoutUser);

export default routes;
