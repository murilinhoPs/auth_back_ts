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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  post: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => UserModel, (user) => user.posts, { cascade: ['insert'] })
  @JoinColumn()
  user: UserModel;
}
