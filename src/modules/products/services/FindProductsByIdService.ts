import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export class FindProductsByIdService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
  ) {}
  async execute(id: string) {
    return await this.productRepository.findById(id);
  }
}
