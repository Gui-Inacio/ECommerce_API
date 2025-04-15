import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class FindCategoryByIdService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string) {
    return await this.categoryRepository.findById(id);
  }
}
