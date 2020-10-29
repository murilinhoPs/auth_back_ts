import { Router } from 'express';
import BioController from '../controllers/bio_controller';

const bioController = new BioController();

const routes = Router();

routes.get('/:id', bioController.getBio).put('/:id', bioController.putBio);

export default routes;
