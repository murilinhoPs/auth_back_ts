import { Response, Request } from 'express';

const CheckReqParams = (req: Request, res: Response) => {
  if (!req.params)
    res.status(400).json({
      message: 'Especifique um id no request.params',
    });
};

export default CheckReqParams;
