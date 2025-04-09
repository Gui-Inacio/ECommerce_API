import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { CreateCategory } from '../../dtos/CreateCategoryDTO';

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: CreateCategory) {
    return await this.categoryRepository.create(data);
  }
}
