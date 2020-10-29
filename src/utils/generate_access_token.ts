import jwt from 'jsonwebtoken';
import IUserModel from '../interfaces/user_model_interface';

const generateAccessToken = (user: IUserModel) => {
  const accessToken = jwt.sign(
    { user: user.id + ' ' + user.username },
    process.env.TOKEN_SECRET,
    { expiresIn: '15min' }
  );

  return accessToken;
};

export default generateAccessToken;
