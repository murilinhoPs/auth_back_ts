import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import fs from 'fs';
import 'express-async-errors';

import UserModel from '../models/users_model';
import IUserModel from '../interfaces/user_model_interface';
import hashPassword from '../utils/hash_password';
import IImageModel from '../interfaces/image_model_interface';
import UserView from '../views/user_view';
import UserValidation from './validation_yup_controller';
import IBioModel from '../interfaces/bio_model_interface';
import IPostModel from '../interfaces/post_model_interface';
import CheckReqParams from '../utils/check_req_params';
import CheckUserReq from '../utils/check_user_req';
import ImageModel from '../models/image_model';
import CheckReqFile from '../utils/check_req_file';
import MailService from '../services/mailing_service';
import IMailOptions from '../interfaces/mail_options_interface';
import IRefreshToken from '../interfaces/refresh_token_interface';

export default class UsersController {
  userValidation = new UserValidation();

  constructor() {
    this.postUser = this.postUser.bind(this);
  }

  async getUsers(req: Request, res: Response) {
    const userTableRepository = getRepository(UserModel);

    if (req.headers['authorization'] === process.env.ADMIN_TOKEN) {
      const users = await userTableRepository.find({
        relations: ['image', 'posts', 'bio', 'refreshToken'],
      });

      res.status(200).send(UserView.renderMany(users));
    }

    res.status(401).json({ message: 'Você não tem permissão para acessar' });
  }

  async getUser(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { id } = req.params;

    CheckUserReq(id, req, res);

    const userTableRepository = getRepository(UserModel);

    try {
      const user = await userTableRepository.findOneOrFail(id, {
        relations: ['image', 'posts', 'bio'],
      });

      res.status(201).send(UserView.render(user));
    } catch (error) {
      id === 'bio'
        ? res.status(404).json({
            message:
              'Bio não encontrada. Especifique um id de usuário para encontrar sua bio',
          })
        : res.status(401).json({ message: 'Usuário não existe', error: error });
    }
  }

  async postUser(req: Request, res: Response) {
    const requestData: IUserModel = req.body;

    requestData.image = req.file;

    await this.userValidation.validatePostUser(requestData);

    const requestImage = req.file;

    CheckReqFile(req, res);

    try {
      const userTableRepository = getRepository(UserModel);

      const hashedPassword = await hashPassword(requestData.password);

      const newUserImage: IImageModel = {
        path: requestImage.filename,
      };

      const baseBio: IBioModel = {
        content: `Oi eu sou o ${requestData.username}, prazer!`,
      };

      const firstPost: IPostModel = {
        post: `Post de usuário criado em: ${Date.now()}`,
      };

      const baseRefreshToken: IRefreshToken = {
        token: '',
      };

      const newUser: IUserModel = {
        username: requestData.username,
        email: requestData.email,
        password: hashedPassword,
        image: newUserImage,
        bio: baseBio,
        posts: [firstPost],
        refreshToken: baseRefreshToken,
      };

      const newDbUser = userTableRepository.create(newUser);

      await userTableRepository.save(newDbUser);

      return res.status(201).json({
        user: {
          id: newDbUser.id,
          username: newDbUser.username,
          email: newDbUser.email,
          image: newDbUser.image,
          bio: newDbUser.bio.content,
          posts: newDbUser.posts,
          token: newDbUser.refreshToken.token,
        },
      });
    } catch (error) {
      fs.unlink(`${requestImage.path}`, (err) => {
        if (err) {
          console.log(err);

          return;
        }
        console.log('Deleted image onUpdating image: ' + requestImage.path);
      });

      return res.status(400).json({
        message: error,
        error: error,
      });
    }
  }

  async putUser(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { id } = req.params;

    CheckUserReq(id, req, res);

    const requestData: IUserModel = req.body;

    if (requestData.username || requestData.email) {
      try {
        const userRepository = getRepository(UserModel);

        if (requestData.username)
          await userRepository.update(id, { username: requestData.username });

        if (requestData.email)
          await userRepository.update(id, { email: requestData.email });

        const user = await userRepository.findOneOrFail(id);

        res
          .status(200)
          .json({ message: 'Usuário atualizado com sucesso', newUser: user });
      } catch (error) {
        res.status(404).json({ message: 'Usuário não existe', error: error });
      }
    }
    return res.status(401).json({
      message: 'Username ou email não encontrados no body;',
    });
  }

  async updatePassword(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { id } = req.params;

    CheckUserReq(id, req, res);

    const { password } = req.body;

    if (!password) res.status(400).send({ mensagem: 'password required' });

    const mailService = new MailService();

    try {
      const userRepository = getRepository(UserModel);

      const hashedPassword = await hashPassword(password);

      await userRepository.update(id, { password: hashedPassword });

      const currentUser = await userRepository.findOne(id);

      const mailMessage: IMailOptions = {
        subject: 'Alteração de senha!',
        from: process.env.MAIL,
        to: currentUser.email,
        html: mailService.emailHtml(currentUser.username, password),
      };

      mailService.sendMail(mailMessage, res);

      res.status(200).json({
        message:
          'Senha atualizada com sucesso! Mandamos sua nova senha no seu email cadastrado',
      });
    } catch (error) {
      res.status(401).json({ message: 'Usuário não existe', error: error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { id } = req.params;

    CheckUserReq(id, req, res);

    const userTableRepository = getRepository(UserModel);

    try {
      await userTableRepository.delete(id);

      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(401).json({ message: 'Usuário não existe', error: error });
    }
  }

  async updateImage(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { id } = req.params;

    CheckUserReq(id, req, res);

    const requestImage = req.file;

    CheckReqFile(req, res);

    const imageRepository = getRepository(ImageModel);

    try {
      const image = await imageRepository.findOneOrFail(id, {
        relations: ['user'],
      });

      fs.unlink(`uploads/${image.path}`, (err) => {
        if (err) {
          console.log(err);

          return;
        }

        console.log('Deleted image onUpdating image: ' + image.path);
      });

      const newImage: IImageModel = {
        path: requestImage.filename,
        user: image.user,
      };

      await imageRepository.update(id, newImage);

      const newDbImage = await imageRepository.findOne(id);

      res.status(200).json({
        message: 'Delete image',
        oldImage: image,
        newImage: newDbImage,
      });
    } catch (error) {
      fs.unlink(`${requestImage.path}`, (err) => {
        if (err) return;

        console.log('Deleted image onUploading newImage: ' + requestImage.path);
      });

      return res
        .status(401)
        .json({ message: 'Usuário não encontrado', error: error });
    }
  }
}
