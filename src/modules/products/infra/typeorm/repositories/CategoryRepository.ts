import { injectable } from 'tsyringe';

import { Category } from '../entities/Category';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import {
  CategorySaveInput,
  CategoryUpdate,
  ICategoryRepository,
} from '@/modules/products/repositories/ICategoryRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class CategoryRepository
  extends AbstractTransactionRepository<Category>
  implements ICategoryRepository
{
  private readonly categoryRepository = AppDataSource.getRepository(Category);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Category);
  }
  async create(data: CategorySaveInput) {
    const category = this.categoryRepository.create(data);
    return await this.categoryRepository.save(category);
  }
  async findById(id: string) {
    return await this.categoryRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.categoryRepository.find();
  }
  async delete(id: string) {
    await this.categoryRepository.delete(id);
  }
  async update(data: CategoryUpdate) {
    await this.categoryRepository.update({ id: data.id }, data);
  }
}
