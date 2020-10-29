import { Response, Request } from 'express';

const CheckUserReq = (userId: string, req: Request, res: Response) => {
  console.log(req.user);
  console.log(userId);

  if (userId !== req.user[0])
    return res.status(401).json({
      message: 'O id não foi encontrado',
    });
};

export default CheckUserReq;
