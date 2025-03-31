import { CreateProductsDTO } from '@/modules/products/dtos/CreateProductDTO';
import { CreateProductService } from '@/modules/products/services/CreateProductsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
export default class ProductController {
  async createProduct(request: Request, response: Response) {
    const requestValidated = new CreateProductsDTO(request.body);

    const createProductServer = container.resolve(CreateProductService);

    const createdProduct = await createProductServer.execute(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdProduct);
  }
}
