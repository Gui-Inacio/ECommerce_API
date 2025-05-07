import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '../../repositories/IOrderRepository';
import { CreateOrder } from '../../dtos/CreateOrderDTO';

import { FindUserByIdService } from '@/modules/users/services/FindUserByIdService';
import NotFound from '@/shared/errors/notFound';

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  async execute(data: CreateOrder) {
    const user = await this.findUserByIdService.execute(data.user);
    if (!user) {
      throw new NotFound('User not found.');
    }
    return await this.orderRepository.create({
      status: data.status,
      user: user,
      total: data.total,
    });
  }
}
