import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductsDTO } from '@/modules/products/dtos/CreateProductDTO';
import { CreateProductService } from '@/modules/products/services/CreateProductsService';
import { FindProductsByIdService } from '@/modules/products/services/FindProductsByIdService';
import NotFound from '@/shared/errors/notFound';
import { ListAllProductsService } from '@/modules/products/services/ListAllProductsService';
import { DeleteProductService } from '@/modules/products/services/DeleteProductService';
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
  public async ListAllProducts(request: Request, response: Response) {
    const listAll = container.resolve(ListAllProductsService);
    const products = await listAll.execute();
    return response.status(200).json(products);
  }
  public async deleteProduct(request: Request, response: Response) {
    const { id } = request.params;
    const deleteProduct = container.resolve(DeleteProductService);
    await deleteProduct.execute(id);
    return response.status(200).json({ message: 'Product succesfuly removed' });
  }
}
