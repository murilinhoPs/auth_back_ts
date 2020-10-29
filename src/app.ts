import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import { config } from 'dotenv';

import HandlerErros from './errors/handler_erros';
import './database/connection';

class App {
  public app: express.Application = express();

  private handleErrors = new HandlerErros();

  constructor() {
    config();
    this.configExpress();
  }

  private configExpress(): void {
    const uploadDir = path.join(__dirname, '..', 'uploads');

    this.app.use(cors());
    this.app.use(express.json());

    this.app.use(routes);
    this.app.use('/uploads', express.static(uploadDir));
    this.app.use(this.handleErrors.errorsHandler);
  }
}

export default new App().app;
