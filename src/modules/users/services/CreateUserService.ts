import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { CreateUser } from '../dtos/CreateUserDTO';
import { omit } from '../../../shared/util/Omit';

import Conflict from '@/shared/errors/conflict';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUser) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Conflict('User already exists');
    }

    const createdUser = await this.userRepository.create(data);
    return omit(createdUser, ['password']);
  }
}
