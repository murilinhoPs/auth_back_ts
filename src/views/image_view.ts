import IImageModel from '../interfaces/image_model_interface';

class ImagerView {
  public render(image: IImageModel): object {
    return {
      id: image.id,
      url: `${process.env.HOST}/uploads/${image.path}`,
    };
  }
}

export default new ImagerView();
