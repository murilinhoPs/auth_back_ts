import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../config/uploads';
import bioRoutes from './bio_routes';
import UsersController from '../controllers/users_controller';
import verifyJWT from '../config/security';

const usersController = new UsersController();

const routes = Router();
const upload = multer(multerConfig);

routes
  .post('/', upload.single('image'), usersController.postUser)
  .get('/', usersController.getUsers)
  .get('/:id', verifyJWT, usersController.getUser)
  .put('/:id', verifyJWT, usersController.putUser)
  .delete('/:id', verifyJWT, usersController.deleteUser)

  .put('/password/:id', verifyJWT, usersController.updatePassword)

  .put(
    '/image/:id',
    [verifyJWT, upload.single('image')],
    usersController.updateImage
  )

  .use('/bio', verifyJWT, bioRoutes);

export default routes;
