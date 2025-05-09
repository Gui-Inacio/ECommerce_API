import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '../../repositories/IOrderRepository';

@injectable()
export class ListAllOrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepositor: IOrderRepository,
  ) {}

  async execute() {
    return await this.orderRepositor.listAll();
  }
}
