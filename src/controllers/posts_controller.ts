import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IAllPosts from '../interfaces/all_posts_interface';
import IPostModel from '../interfaces/post_model_interface';
import PostModel from '../models/post_model';
import UserModel from '../models/users_model';
import AllPostsView from '../views/all_posts_view';
import CheckReqParams from '../utils/check_req_params';
import CheckUserReq from '../utils/check_user_req';

export default class PostsController {
  async getPosts(req: Request, res: Response) {
    const userRepository = getRepository(UserModel);

    let usersWithPosts: Array<IAllPosts> = [];

    const users = await userRepository.find({
      relations: ['posts', 'image'],
    });

    users.forEach((user) =>
      usersWithPosts.push({
        userId: user.id,
        username: user.username,
        image_url: user.image.path,
        posts: user.posts,
      })
    );

    res.status(201).send(AllPostsView.renderMany(usersWithPosts));
  }

  async getPostsFromUser(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { id } = req.params;
    CheckUserReq(id, req, res);

    const userTableRepository = getRepository(UserModel);

    let posts = [];

    try {
      const user = await userTableRepository.findOneOrFail(id, {
        relations: ['posts'],
      });

      user.posts.forEach((post) => posts.push(post));

      res.status(200).json({ posts: posts });
    } catch (error) {
      res.status(404).json({ message: 'Usuário não existe' });
    }
  }

  async createPostFromUser(req: Request, res: Response) {
    CheckReqParams(req, res);

    const postData: IPostModel = req.body;
    const { userId } = req.params;

    CheckUserReq(userId, req, res);

    const userTableRepository = getRepository(UserModel);
    const postRepository = getRepository(PostModel);

    try {
      const userWithPost = await userTableRepository.findOneOrFail(userId, {
        relations: ['posts'],
      });

      const newPost: IPostModel = {
        post: postData.post,
        user: userWithPost,
      };

      await postRepository.save(newPost);

      const userDbNewPost = await userTableRepository.findOneOrFail(userId, {
        relations: ['posts'],
      });

      res.status(200).json({
        newPost: postData,
        user: userDbNewPost.id,
        newUserPosts: userDbNewPost.posts,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Não foi possivel criar um novo post',
        error: error,
      });
    }
  }

  async putPostFromUser(req: Request, res: Response) {
    CheckReqParams(req, res);

    const postData: IPostModel = req.body;
    const { userId, postId } = req.params;

    CheckUserReq(userId, req, res);

    const userTableRepository = getRepository(UserModel);
    const postRepository = getRepository(PostModel);

    try {
      await userTableRepository.findOneOrFail(userId, {
        relations: ['posts'],
      });

      const searchedPost = await postRepository.findOneOrFail(postId);

      await postRepository.update(postId, postData);

      const newDbUserPost = await postRepository.findOne(postId);

      res.status(200).json({ oldPost: searchedPost, newPost: newDbUserPost });
    } catch (error) {
      res.status(404).json({
        message: 'Não foi encontrado nenhum usuário ou post com esses ids',
        error: error,
      });
    }
  }

  async deletePostFromUser(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { userId, postId } = req.params;

    CheckUserReq(userId, req, res);

    const userTableRepository = getRepository(UserModel);
    const postRepository = getRepository(PostModel);

    try {
      await postRepository.delete(postId);

      const updatedPosts = await userTableRepository.findOneOrFail(userId, {
        relations: ['posts'],
      });

      res.status(200).json({
        message: 'Postagem deletada com sucesso',
        posts: updatedPosts.posts,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Não foi encontrado nenhum usuário ou post com esses ids',
        error: error,
      });
    }
  }
}
