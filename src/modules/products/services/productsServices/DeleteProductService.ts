import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
export class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
  ) {}

  async execute(id: string) {
    await this.productRepository.delete(id);
  }
}
