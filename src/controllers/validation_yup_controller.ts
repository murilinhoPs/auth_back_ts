import fs from 'fs';
import * as Yup from 'yup';
import IUserModel from '../interfaces/user_model_interface';

class UserValidation {
  private postUserSchema = Yup.object().shape({
    username: Yup.string().min(3).required(),
    email: Yup.string().min(5).email().required(),
    password: Yup.string().min(8).required(),
    image: Yup.object().shape({
      path: Yup.string().required(),
    }),
  });

  private emailSchema = Yup.string().email();

  async validateEmail(email: string) {
    return await this.emailSchema.validate(email);
  }

  async validatePostUser(user: IUserModel) {
    return await this.postUserSchema.validate(user, { abortEarly: false });
  }
}

export default UserValidation;
