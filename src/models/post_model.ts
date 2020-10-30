import UserModel from './users_model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import IPostModel from '../interfaces/post_model_interface';

@Entity('posts')
export default class PostModel {
  //implements IPostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post: string;

  @ManyToOne((type) => UserModel, (user) => user.posts, { cascade: ['insert'] })
  @JoinColumn()
  user: UserModel;
}
