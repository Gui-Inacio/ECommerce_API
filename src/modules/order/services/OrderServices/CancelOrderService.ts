import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '../../repositories/IOrderRepository';
import { CancelOrder } from '../../dtos/CancelOrderDTO';

import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import NotFound from '@/shared/errors/notFound';
import Conflict from '@/shared/errors/conflict';

@injectable()
export class CancelOrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
    @inject('UserRepository')
    private readonly userReository: IUserRepository,
  ) {}
  async execute({ order_id, user_id }: CancelOrder) {
    const user = await this.userReository.findById(user_id);
    if (!user) {
      throw new NotFound('User not found.');
    }

    const order = await this.orderRepository.findById(order_id);
    if (!order) {
      throw new NotFound('Order not found.');
    }

    if (order.user.id !== user.id) {
      throw new Conflict('This order does not belong to the user.');
    }
    if (order.status === 'canceled') {
      throw new Conflict('This order is already canceled.');
    }

    if (order.status === 'finalized') {
      throw new Conflict('Cannot cancel a finalized order');
    }

    order.status = 'canceled';
    await this.orderRepository.save(order);

    return {
      message: 'Order canceled successfully',
      orderId: order.id,
      status: order.status,
    };
  }
}
