import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { JsonWebTokenError } from 'jsonwebtoken';
import fs from 'fs';

import IValidationErrors from '../interfaces/validation_errors_interface';

class ErrorHandler {
  public errorsHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
      console.log(error);

      let validationErrors: IValidationErrors = {};

      let imagePath: string = error.value.image.path;

      error.inner.forEach((err) => {
        validationErrors[err.path] = err.errors;
      });

      if (error.value.image.path !== null) {
        imagePath = error.value.image.path;

        console.log(imagePath);

        fs.unlink(`${imagePath}`, (err) => {
          if (err) return;

          console.log('Deleted image onError: ' + imagePath);
        });
      }

      return res
        .status(400)
        .json({ message: 'Validation failed', validationErrors });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({
        message: 'Token não é válido.',
        error: error,
      });
    }

    return res
      .status(500)
      .json({ message: 'Internal server eror', error: error });
  };
}

export default ErrorHandler;
