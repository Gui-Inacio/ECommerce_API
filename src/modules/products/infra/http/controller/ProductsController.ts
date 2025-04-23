import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductsDTO } from '@/modules/products/dtos/CreateProductDTO';
import { CreateProductService } from '@/modules/products/services/productsServices/CreateProductsService';
import { FindProductsByIdService } from '@/modules/products/services/productsServices/FindProductsByIdService';
import NotFound from '@/shared/errors/notFound';
import { ListAllProductsService } from '@/modules/products/services/productsServices/ListAllProductsService';
import { DeleteProductService } from '@/modules/products/services/productsServices/DeleteProductService';
import { UpdateProductService } from '@/modules/products/services/productsServices/UpdateProductService';
import { UpdateProductDTO } from '@/modules/products/dtos/UpdateProductDTO';
export default class ProductController {
  public async createProduct(request: Request, response: Response) {
    const requestValidated = new CreateProductsDTO(request.body);

    const createProductService = container.resolve(CreateProductService);

    const createdProduct = await createProductService.execute(
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
    return response
      .status(200)
      .json({ message: 'Product succesfully removed' });
  }

  public async updateProduct(request: Request, response: Response) {
    const requestValidated = new UpdateProductDTO({
      id: request.params.id,
      ...request.body,
    });
    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute(
      requestValidated.getAll(),
    );
    return response.status(200).json(product);
  }
}
