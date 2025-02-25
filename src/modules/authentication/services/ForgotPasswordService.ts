import { inject, injectable } from 'tsyringe';

import NodemailerProvider from '@/shared/container/providers/email/NodeMailerProvider';
import { EmailTemplate } from '@/shared/container/providers/email/models/IEmailProvider';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

@injectable()
export class ForgotPasswordService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return;
    }

    const newPassword = new Date().getTime().toString().slice(-6);

    await this.userRepository.updatePassword({
      id: user.id,
      password: newPassword,
    });

    await this.sendEmail(email, newPassword);
  }

  async sendEmail(email: string, password: string) {
    await new NodemailerProvider().sendEmail(
      email,
      'Redefinir Senha',
      EmailTemplate.FORGOT_PASSWORD,
      { password },
    );
  }
}
