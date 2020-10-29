export default interface INewsModel {
  user: {
    name: string;
    profile_picture: string;
  };
  message: {
    content: string;
    created_at: Date;
  };
}
