import { createTransport } from 'nodemailer';
import Mail, { type Options } from 'nodemailer/lib/mailer';
import hbs from 'nodemailer-express-handlebars';

import path from 'path';
import fs from 'fs';

import { logger } from '../logger';

import { IEmailProvider } from './models/IEmailProvider';

type ExtendedOptions = Options & {
  template: string;
  context: Record<string, unknown>;
};

class NodemailerProvider implements IEmailProvider {
  transporter: Mail;

  constructor() {
    this.transporter = createTransport({
      host: process.env.EMAIL_HOST ?? 'smtp.mailtrap.io',
      service: 'gmail',
      port: Number(process.env.EMAIL_PORT) || 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const options = {
      viewEngine: {
        partialsDir: path.resolve(__dirname, 'views', 'partials'),
        layoutsDir: path.resolve(__dirname, 'views', 'layouts'),
        extname: '.hbs',
      },
      extName: '.hbs',
      viewPath: path.resolve(__dirname, 'views'),
    };

    this.transporter.use('compile', hbs(options));
  }

  public async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, unknown>,
  ): Promise<void> {
    const style = fs.readFileSync(
      path.resolve(__dirname, 'views', 'css', `${template}.css`),
    );
    context.style = style;

    const options: ExtendedOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      context,
      template,
    };

    this.transporter
      .sendMail(options)
      .then(() => {
        logger.info(`E-mail enviado com sucesso: ${subject}`);
      })
      .catch((err) => {
        logger.error(`Erro ao enviar e-mail: ${err}`);
      });
  }
}

export default NodemailerProvider;
