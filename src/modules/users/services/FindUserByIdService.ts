import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFound('User not found.');
    }
    return user;
  }
}
