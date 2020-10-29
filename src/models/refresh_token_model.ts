import UserModel from './users_model';
import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import IRefreshToken from '../interfaces/refresh_token_interface';

@Entity('refreshToken')
export default class RefreshTokenModel {
  //implements IRefreshToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  token: string;

  @OneToOne((type) => UserModel, (user) => user.refreshToken)
  @JoinColumn()
  user: UserModel;
}
