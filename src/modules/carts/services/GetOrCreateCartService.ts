import { inject, injectable } from 'tsyringe';

import { ICartRepository } from '../repositories/ICartRepository';
import { Cart } from '../infra/typeorm/entities/Cart';

import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import NotFound from '@/shared/errors/notFound';

@injectable()
export class GetOrCreateCartService {
  constructor(
    @inject('CartRepository')
    private readonly cartRepository: ICartRepository,
    @inject('UserRepositoryy')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<Cart> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFound('User not found.');
    }
    let cart = await this.cartRepository.findActiveByUserId(user.id);

    if (!cart) {
      cart = await this.cartRepository.create({
        user: user,
        status: 'active',
      });
    }
    return cart;
  }
}
