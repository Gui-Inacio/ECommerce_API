import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '../repositories/IAddressRepository';

import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindAllAddressByUserService {
  constructor(
    @inject('AddressRepository')
    private readonly addressRepository: IAddressRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(user_id: string) {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new NotFound('User not found.');
    }
    return await this.addressRepository.findAllAddressByUser(user.id);
  }
}
