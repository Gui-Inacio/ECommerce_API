import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '../../repositories/IOrderRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindOrderByIdService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}
  async execute(id: string) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFound('Order not found.');
    }
    return order;
  }
}
