import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IUserModel from '../interfaces/user_model_interface';
import UserModel from '../models/users_model';
import UserValidation from './validation_yup_controller';
import generateAccessToken from '../utils/generate_access_token';
import checkValidPassword from '../utils/check_valid_password';
import IRefreshToken from '../interfaces/refresh_token_interface';
import RefreshTokenModel from '../models/refresh_token_model';
import CheckReqParams from '../utils/check_req_params';
import CheckUserReq from '../utils/check_user_req';

export default class AuthController {
  private userValidation = new UserValidation();

  constructor() {
    this.authUser = this.authUser.bind(this);
  }

  async authUser(req: Request, res: Response) {
    try {
      const requestData: IUserModel = req.body;

      if (!requestData.username && !requestData.email)
        res.status(400).send({ mensagem: 'Não tem username ou email' });

      if (!requestData.password)
        res.status(400).send({ mensagem: 'password required' });

      const userRepository = getRepository(UserModel);
      const tokenRepository = getRepository(RefreshTokenModel);

      let user: UserModel;
      let userPassword: string;

      try {
        const { username, email } = requestData;

        if (username) {
          await userRepository
            .findOne({
              where: { username },
              select: ['password'],
            })
            .then((user) => (userPassword = user.password));

          user = await userRepository.findOneOrFail({
            where: { username },
            relations: ['refreshToken'],
          });
        }

        if (email) {
          await this.userValidation.validateEmail(email);

          await userRepository
            .findOne({
              where: { username },
              select: ['password'],
            })
            .then((user) => (userPassword = user.password));

          user = await userRepository.findOneOrFail({
            where: { email },
            relations: ['refreshToken'],
          });
        }
      } catch (error) {
        return res
          .status(404)
          .json({ message: 'Usuário não existe', error: error });
      }

      if (!checkValidPassword(requestData.password, userPassword)) {
        res.status(401).json({ error: 'Sem permissão. Senha está incorreta.' });
        return;
      }

      const accessToken = generateAccessToken(user);
      const generatedRefreshToken = jwt.sign(
        { user: user.id + ' ' + user.username },
        process.env.REFRESH_TOKEN_SECRET
      );

      const refreshToken: IRefreshToken = {
        token: generatedRefreshToken,
      };

      await tokenRepository.update(user.id, refreshToken);

      res.status(200).json({
        userId: user.id,
        username: user.username,
        accessToken: accessToken,
        refreshToken: generatedRefreshToken,
      });
    } catch (err) {
      res.status(400).send({ erro: err.message });
    }
  }

  async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken: string = req.headers['x-refresh-token'] as string;

    console.log(refreshToken);

    if (!refreshToken)
      return res.status(401).json({ message: 'Refresh token não encontrado' });

    const tokenRepository = getRepository(RefreshTokenModel);

    try {
      const tokenWithUser = await tokenRepository.findOneOrFail({
        where: { token: refreshToken },
        relations: ['user'],
      });

      console.log(tokenWithUser);

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
          if (error)
            return res.status(403).json({
              message: 'Token inválido. Faça login novamente',
            });

          const accessToken = generateAccessToken(tokenWithUser.user);

          req.user = accessToken;

          return res
            .status(401)
            .json({ refreshAccess: true, accessToken: accessToken });
        }
      );
    } catch (error) {
      return res.status(400).json({
        message: 'Token errado ou inválido',
      });
    }
  }

  async logoutUser(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { id } = req.params;

    CheckUserReq(id, req, res);

    const tokenRepository = getRepository(RefreshTokenModel);

    try {
      const deletedRefreshToken: IRefreshToken = {
        token: '',
      };

      await tokenRepository.update(id, deletedRefreshToken);

      return res.status(200).json({ message: 'Logout com sucesso' });
    } catch (error) {
      return res.status(403).json({ message: 'Usuário não encontrado' });
    }
  }
}
