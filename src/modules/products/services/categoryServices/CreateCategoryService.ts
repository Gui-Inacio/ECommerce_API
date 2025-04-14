import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { CreateCategory } from '../../dtos/CreateCategoryDTO';

import BadRequest from '@/shared/errors/badRequest';

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: CreateCategory) {
    const categoryExists = await this.categoryRepository.findByName(data.name);
    if (categoryExists) {
      throw new BadRequest('A category with this name already exists.');
    }
    return await this.categoryRepository.create(data);
  }
}
