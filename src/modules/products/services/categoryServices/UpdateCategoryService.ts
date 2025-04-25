import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { UpdateCategory } from '../../dtos/UpdateCategoryDTO';

import Conflict from '@/shared/errors/conflict';

@injectable()
export class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}
  async execute(data: UpdateCategory) {
    const categoryExists = await this.categoryRepository.findByName(data.name);
    if (categoryExists && categoryExists.id !== data.id) {
      throw new Conflict('This category name is already in use.');
    }
    await this.categoryRepository.update({
      id: data.id,
      name: data.name,
    });
  }
}
