import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { injectable } from 'tsyringe';
import { CartItem } from '../entities/CartItem';
import {
  CartItemSaveImput,
  CartItemUpdate,
  IcartItemRepository,
} from '@/modules/carts/repositories/ICartItemRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class CartItemRepository
  extends AbstractTransactionRepository<CartItem>
  implements IcartItemRepository
{
  private readonly cartItemRepository = AppDataSource.getRepository(CartItem);
  constructor(protected transaction: TransactionManager) {
    super(transaction, CartItem);
  }
  async create(data: CartItemSaveImput) {
    const cartItem = this.cartItemRepository.create(data);
    return await this.cartItemRepository.save(cartItem);
  }
  async findById(id: string) {
    return await this.cartItemRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.cartItemRepository.find();
  }
  async delete(id: string) {
    await this.cartItemRepository.delete(id);
  }
  async update(data: CartItemUpdate) {
    await this.cartItemRepository.update({ id: data.id }, data);
  }
}
