import UserModel from './users_model';
import IImageModel from '../interfaces/image_model_interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('images')
export default class ImageModel {
  //implements IImageModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @OneToOne((type) => UserModel, (user) => user.image)
  @JoinColumn()
  user: UserModel;
}
