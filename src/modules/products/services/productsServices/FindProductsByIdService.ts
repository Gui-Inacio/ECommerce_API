import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../repositories/IProductsRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindProductsByIdService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
  ) {}
  async execute(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFound('Product not found!');
    }
    return product;
  }
}
