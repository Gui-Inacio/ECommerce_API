import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class FindByNameService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(name: string) {
    return await this.categoryRepository.findByName(name);
  }
}
