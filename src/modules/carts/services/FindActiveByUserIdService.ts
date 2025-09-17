import { inject, injectable } from 'tsyringe';

import { ICartRepository } from '../repositories/ICartRepository';

import NotFound from '@/shared/errors/notFound';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

@injectable()
export class FindActiveByUserIdService {
  constructor(
    @inject('CartRepository')
    private readonly cartRepository: ICartRepository,
    @inject('UserRepository')
    private readonly userRepositor: IUserRepository,
  ) {}
  async execute(id: string) {
    const user = await this.userRepositor.findById(id);
    if (!user) {
      throw new NotFound('User not found.');
    }
    const cart = await this.cartRepository.findActiveByUserId(user.id);
    if (!cart) {
      throw new NotFound('Cart not found.');
    }
    return cart;
  }
}
