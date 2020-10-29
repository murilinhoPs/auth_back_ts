import IUserModel from '../interfaces/user_model_interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import ImageModel from './image_model';
import BioModel from './bio_model';
import PostModel from './post_model';
import RefreshTokenModel from './refresh_token_model';

@Entity('users')
export default class UserModel {
  //implements IUserModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsEmail()
  @Column()
  email: string;

  @MinLength(8)
  @Column({ select: false })
  password: string;

  @OneToOne((type) => RefreshTokenModel, (token) => token.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  refreshToken: RefreshTokenModel;

  @OneToOne((type) => ImageModel, (image) => image.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  image: ImageModel;

  @OneToOne((type) => BioModel, (bio) => bio.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  bio: BioModel;

  @OneToMany((type) => PostModel, (post) => post.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: PostModel[];
}
