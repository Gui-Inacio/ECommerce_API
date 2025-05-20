import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../repositories/IProductsRepository';
import { CreateProduct } from '../../dtos/CreateProductDTO';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: CreateProduct) {
    const category = await this.categoryRepository.findById(data.category);
    if (!category) {
      throw new NotFound('Category not found.');
    }
    return await this.productRepository.create({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: category,
    });
  }
}
