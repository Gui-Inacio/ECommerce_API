import { injectable } from 'tsyringe';

import { OrderItem } from '../entities/OrderItem';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import {
  IOrderItemRepository,
  OrderItemSaveInput,
  OrderItemUpdate,
} from '@/modules/order/repositories/IOrderItemRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class OrderItemRepository
  extends AbstractTransactionRepository<OrderItem>
  implements IOrderItemRepository
{
  private readonly orderItemRepository = AppDataSource.getRepository(OrderItem);
  constructor(protected transaction: TransactionManager) {
    super(transaction, OrderItem);
  }
  async create(data: OrderItemSaveInput) {
    const order = this.orderItemRepository.create(data);
    return await this.orderItemRepository.save(order);
  }
  async findById(id: string) {
    return await this.orderItemRepository.findOne({ where: { id } });
  }
  async listAlll() {
    return await this.orderItemRepository.find();
  }
  async delete(id: string) {
    await this.orderItemRepository.delete(id);
  }
  async update(data: OrderItemUpdate) {
    await this.orderItemRepository.update({ id: data.id }, data);
  }
}
