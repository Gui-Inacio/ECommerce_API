import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductsDTO } from '@/modules/products/dtos/CreateProductDTO';
import { CreateProductService } from '@/modules/products/services/CreateProductsService';
import { FindProductsByIdService } from '@/modules/products/services/FindProductsByIdService';
import NotFound from '@/shared/errors/notFound';
export default class ProductController {
  public async createProduct(request: Request, response: Response) {
    const requestValidated = new CreateProductsDTO(request.body);

    const createProductServer = container.resolve(CreateProductService);

    const createdProduct = await createProductServer.execute(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdProduct);
  }
  public async findProductById(request: Request, response: Response) {
    const { id } = request.params;
    const findById = container.resolve(FindProductsByIdService);
    const product = await findById.execute(id);

    if (!product) {
      throw new NotFound('Product not found!');
    }
    return response.status(200).json(product);
  }
}
