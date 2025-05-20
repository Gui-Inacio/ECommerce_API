import { inject, injectable } from 'tsyringe';

import { IOrderItemRepository } from '../../repositories/IOrderItemRepository';
import { IOrderRepository } from '../../repositories/IOrderRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class ListAllOrderItemsByOrderService {
  constructor(
    @inject('OrderItemRepository')
    private readonly orderItemRepository: IOrderItemRepository,
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: string) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFound('Order not found.');
    }
    const items = await this.orderItemRepository.listAllByOrder(id);
    return items;
  }
}
