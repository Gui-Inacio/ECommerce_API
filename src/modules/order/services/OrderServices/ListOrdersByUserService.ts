import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '../../repositories/IOrderRepository';

import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import NotFound from '@/shared/errors/notFound';

@injectable()
export class ListOrderByUserService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(user_id: string) {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new NotFound('User not found.');
    }
    const orders = await this.orderRepository.listOrderByUser(user_id);
    if (orders.length === 0) {
      throw new NotFound('No orders found for this user.');
    }
    return orders;
  }
}
