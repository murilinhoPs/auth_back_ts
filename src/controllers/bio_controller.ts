import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IBioModel from '../interfaces/bio_model_interface';
import BioModel from '../models/bio_model';
import CheckReqParams from '../utils/check_req_params';
import CheckUserReq from '../utils/check_user_req';

export default class BioController {
  async putBio(req: Request, res: Response) {
    CheckReqParams(req, res);

    try {
      const requestData: IBioModel = req.body;

      const { id } = req.params;

      CheckUserReq(id, req, res);

      if (requestData.content === '' || requestData.content === null) return;

      const bioRepository = getRepository(BioModel);

      const newUserBio: IBioModel = {
        content: requestData.content,
      };

      await bioRepository.update(id, newUserBio);

      const newDbUserBio = await bioRepository.findOne(id);

      return res.status(201).json({
        bio: {
          id: newDbUserBio.id,
          content: newDbUserBio.content,
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Não foi possível atualizar a bio.',
      });
    }
  }

  async getBio(req: Request, res: Response) {
    CheckReqParams(req, res);

    const { id } = req.params;

    CheckUserReq(id, req, res);

    const bioRepository = getRepository(BioModel);
    try {
      const userBio = await bioRepository.findOneOrFail(id);

      return res.status(201).json({
        bio: userBio,
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Não foi possível encontrar nenhum usuário com esse id',
        error: error,
      });
    }
  }
}
