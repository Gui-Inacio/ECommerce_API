import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../repositories/IProductsRepository';
import { UpdateProduct } from '../dtos/UpdateProductDTO';

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
  ) {}

  async execute(data: UpdateProduct) {
    await this.productRepository.update({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    });
  }
}
