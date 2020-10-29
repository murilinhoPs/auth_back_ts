import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import UserModel from './users_model';
import IBioModel from '../interfaces/bio_model_interface';

@Entity('bio')
export default class BioModel {
  //implements IBioModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @OneToOne((type) => UserModel, (user) => user.bio)
  @JoinColumn()
  user: UserModel;
}
