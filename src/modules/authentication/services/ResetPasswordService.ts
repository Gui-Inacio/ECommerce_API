import { inject, injectable } from 'tsyringe';

import { ResetPasswordData } from '../dtos/ResetPasswordDTO';

import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { comparePassword } from '@/shared/util/Password';
import BadRequest from '@/shared/errors/badRequest';

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ password, userId, oldPassword }: ResetPasswordData) {
    await this.validatePassword({ password, userId, oldPassword });
    await this.userRepository.updatePassword({
      id: userId,
      password,
    });

    return { mensagem: 'Senha atualizada com sucesso!' };
  }

  async validatePassword({
    userId,
    oldPassword,
    password,
  }: Omit<ResetPasswordData, 'confirmPassword'>) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new BadRequest('Usuário inválido');
    }

    const isSamePassword = await comparePassword(oldPassword, user.password);

    if (!isSamePassword) {
      throw new BadRequest('A senha atual é inválida');
    }

    if (password === oldPassword) {
      throw new BadRequest('A nova senha deve ser diferente da senha atual');
    }
  }
}
