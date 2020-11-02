import { GcsFileUpload } from 'gcs-file-upload';
import path from 'path';
import fs from 'fs';
import IImageModel from '../interfaces/image_model_interface';
import { Response } from 'express';

export default class UploadImage {
  private projectId = 'backend-ts';
  private serviceKey = path.join(__dirname, '..', '..', './keys.json');

  constructor() {
    this.upload = this.upload.bind(this);
  }

  async upload(requestImage: Express.Multer.File, res: Response) {
    const myBucket = new GcsFileUpload(
      {
        keyFilename: this.serviceKey,
        projectId: this.projectId,
      },
      'bt-uploads'
    );

    let myFile = fs.readFileSync(requestImage.path);

    let bufferNumberArray = [...myFile];

    const fileMetaData = {
      originalname: requestImage.filename,
      buffer: myFile,
    };

    try {
      const bucketImage = await myBucket.uploadFile(fileMetaData as any);

      return bucketImage;
    } catch (err) {
      console.log(err);

      res.status(400).json({
        messsage: 'erro ao fazer upload do arquivo',
        error: err,
      });
    }
  }
}
