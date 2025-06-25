import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '../repositories/IAddressRepository';

import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import NotFound from '@/shared/errors/notFound';

@injectable()
export class SetAllAsNotDefaultService {
  constructor(
    @inject('AddressRepository')
    private readonly addressRepository: IAddressRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFound('User not found!');
    }
    await this.addressRepository.updateManyAsNotDefault(userId);
  }
}
