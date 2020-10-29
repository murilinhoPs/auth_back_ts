import { Response, Request } from 'express';

const CheckReqFile = (req: Request, res: Response) => {
  if (!req.file)
    res.status(400).json({
      message:
        'Não foi possível completar a operação pois não existe nenhum arquivo na requisição',
    });
};

export default CheckReqFile;
