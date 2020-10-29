export default interface IMailOptions {
  from: string;
  subject: string;
  to: string;
  text?: string;
  html?: string;
}
