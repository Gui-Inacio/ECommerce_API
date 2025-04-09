import { injectable } from 'tsyringe';

import { Product } from '../entities/Products';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import {
  IProductsRepository,
  ProductSaveInput,
  ProductUpdate,
} from '@/modules/products/repositories/IProductsRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class ProductRepository
  extends AbstractTransactionRepository<Product>
  implements IProductsRepository
{
  private readonly productRepository = AppDataSource.getRepository(Product);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Product);
  }
  async create(data: ProductSaveInput) {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);
  }
  async findById(id: string) {
    return await this.productRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.productRepository.find();
  }
  async delete(id: string) {
    await this.productRepository.delete(id);
  }
  async update(data: ProductUpdate) {
    await this.productRepository.update({ id: data.id }, data);
  }
}
