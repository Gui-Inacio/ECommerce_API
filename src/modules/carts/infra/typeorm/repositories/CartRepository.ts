import { injectable } from 'tsyringe';

import { Cart } from '../entities/Cart';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import {
  CartSaveInput,
  CartUpdate,
  ICartRepository,
} from '@/modules/carts/repositories/ICartRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class CartRepository
  extends AbstractTransactionRepository<Cart>
  implements ICartRepository
{
  private readonly cartRepository = AppDataSource.getRepository(Cart);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Cart);
  }
  async create(data: CartSaveInput) {
    const cart = this.cartRepository.create(data);
    return await this.cartRepository.save(cart);
  }
  async findById(id: string) {
    return await this.cartRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.cartRepository.find();
  }
  async delete(id: string) {
    await this.cartRepository.delete(id);
  }
  async update(data: CartUpdate) {
    await this.cartRepository.update({ id: data.id }, data);
  }
  async findActiveByUserId(id: string) {
    return await this.cartRepository.findOne({
      where: { user: { id: id }, status: 'active' },
      relations: ['cartItems', 'cartItems.product'],
    });
  }
}
