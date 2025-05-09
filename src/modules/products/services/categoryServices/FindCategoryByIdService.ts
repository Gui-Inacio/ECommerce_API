import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindCategoryByIdService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFound('Category not found!');
    }
    return category;
  }
}
