import IBioModel from '../interfaces/bio_model_interface';

class BioView {
  public render(bio: IBioModel): object {
    return {
      id: bio.id,
      content: bio.content,
    };
  }
}

export default new BioView();
