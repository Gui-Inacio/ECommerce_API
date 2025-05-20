import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../repositories/IProductsRepository';
import { UpdateProduct } from '../../dtos/UpdateProductDTO';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: UpdateProduct) {
    const category = await this.categoryRepository.findById(data.category);
    if (!category) {
      throw new NotFound('Category not found.');
    }
    await this.productRepository.update({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: category,
    });
  }
}
