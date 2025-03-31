import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { CreateProduct } from '../dtos/CreateProductDTO';

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
  ) {}

  async execute(data: CreateProduct) {
    return await this.productRepository.create(data);
  }
}
