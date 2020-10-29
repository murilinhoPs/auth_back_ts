import { Response } from 'express';
import nodemailer from 'nodemailer';
import IMailOptions from '../interfaces/mail_options_interface';

export default class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST,
    secure: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_SECRET,
    },
  });

  constructor() {
    this.sendMail = this.sendMail.bind(this);
  }

  sendMail(mailOptions: IMailOptions, res: Response) {
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).json({
          message: 'Erro ao enviar o email',
        });
      }
      console.log('Email sent: ' + info.response);
    });
  }

  public emailHtml(username: string, password: string) {
    return `
    <div style="display: flex; justify-content: center; align-items: center;    
    flex-direction: column;
    width: 100%;">
    <h4>Oi ${username}, está é sua nova senha: </h4>
    <h3>  </h3>
    <h3>${password}</h3>
    </div>
    `;
  }
}
