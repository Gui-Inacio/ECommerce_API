import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ForgotPasswordService } from '../../../services/ForgotPasswordService';
import { LoginService } from '../../../services/LoginService';
import { ResetPasswordService } from '../../../services/ResetPasswordService';
import { LoginDTO } from '../../../dtos/LoginDTO';
import { ForgotPasswordDTO } from '../../../dtos/ForgotPasswordDTO';

import { ResetPasswordDTO } from '@/modules/authentication/dtos/ResetPasswordDTO';

export class AuthenticationController {
  async login(request: Request, response: Response) {
    const { password, email } = new LoginDTO(request.body).getAll();

    const loginService = container.resolve(LoginService);

    const token = await loginService.execute({
      password,
      email,
    });

    return response.json(token);
  }

  async forgotPassword(request: Request, response: Response) {
    const requestValidated = new ForgotPasswordDTO(request.body);

    const forgotPasswordService = container.resolve(ForgotPasswordService);

    await forgotPasswordService.execute(requestValidated.get('email'));

    const mensagem = { mensagem: 'E-mail enviado com sucesso!' };
    return response.json(mensagem);
  }

  async resetPassword(request: Request, response: Response) {
    const requestValidated = new ResetPasswordDTO({
      ...request.body,
      ...response.locals,
    });

    const resetPasswordService = container.resolve(ResetPasswordService);

    const mensagem = await resetPasswordService.execute(
      requestValidated.getAll(),
    );

    return response.json(mensagem);
  }
}
