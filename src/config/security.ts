import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
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

    req.user = user;

    return next();
  } catch (error) {
    return res.redirect(303, '/auth/token/');
  }
};

export default verifyJWT;
