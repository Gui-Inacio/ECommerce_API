import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string) {
    const exists = await this.categoryRepository.findById(id);
    if (!exists) {
      throw new NotFound('Category not found!');
    }
    await this.categoryRepository.delete(id);
  }
}
