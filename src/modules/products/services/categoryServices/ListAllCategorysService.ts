import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class ListAllCategorysService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoyRepository: ICategoryRepository,
  ) {}

  async execute() {
    return await this.categoyRepository.listAll();
  }
}
