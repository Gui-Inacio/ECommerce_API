import { injectable } from 'tsyringe';

import { Order } from '../entities/Order';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import {
  IOrderRepository,
  OrderSaveInput,
  OrderUpdate,
} from '@/modules/order/repositories/IOrderRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class OrderRepository
  extends AbstractTransactionRepository<Order>
  implements IOrderRepository
{
  private readonly orderRepository = AppDataSource.getRepository(Order);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Order);
  }
  async create(data: OrderSaveInput) {
    const order = this.orderRepository.create(data);
    return await this.orderRepository.save(order);
  }
  async findById(id: string) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
  async listAll() {
    return await this.orderRepository.find({
      relations: ['user'],
    });
  }
  async delete(id: string) {
    await this.orderRepository.delete(id);
  }
  async update(data: OrderUpdate) {
    await this.orderRepository.update({ id: data.id }, data);
  }
  async save(order: Order) {
    return await this.orderRepository.save(order);
  }
  async listOrderByUser(user_id: string) {
    return await this.orderRepository.find({
      where: { user: { id: user_id } },
      relations: ['user'],
    });
  }
}
