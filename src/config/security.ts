import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthController from '../controllers/auth_controller';
import ITokenPayload from '../interfaces/token_payload_interface';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers['authorization'];

  if (!accessToken)
    return res
      .status(401)
      .json({ message: 'Auth token não foi enviado nos headers' });

  try {
    const data = jwt.verify(accessToken, process.env.TOKEN_SECRET);

    const { user } = data as ITokenPayload;

    console.log(data);

    req.user = user;

    return next();
  } catch (error) {
    return AuthController.refreshAccessToken(req, res); //res.redirect('/auth/token/');
  }
};

export default verifyJWT;
