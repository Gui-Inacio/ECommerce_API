import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
export class ListAllProductsService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
  ) {}

  async execute() {
    return await this.productRepository.listAll();
  }
}
