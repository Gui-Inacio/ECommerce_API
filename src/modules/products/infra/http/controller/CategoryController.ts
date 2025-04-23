import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryDTO } from '@/modules/products/dtos/CreateCategoryDTO';
import { CreateCategoryService } from '@/modules/products/services/categoryServices/CreateCategoryService';
import { FindCategoryByIdService } from '@/modules/products/services/categoryServices/FindCategoryByIdService';
import { DeleteCategoryService } from '@/modules/products/services/categoryServices/DeleteCategoryService';
import { ListAllCategorysService } from '@/modules/products/services/categoryServices/ListAllCategorysService';
export class CategoryController {
  public async createCategory(request: Request, response: Response) {
    const requestValidated = new CreateCategoryDTO(request.body);

    const createCategoryService = container.resolve(CreateCategoryService);

    const createdCategory = await createCategoryService.execute(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdCategory);
  }

  public async findById(request: Request, response: Response) {
    const findById = container.resolve(FindCategoryByIdService);
    const { id } = request.params;
    const category = await findById.execute(id);

    return response.status(200).json(category);
  }
  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deletedCategory = container.resolve(DeleteCategoryService);
    await deletedCategory.execute(id);

    return response
      .status(200)
      .json({ message: 'Category succesfully removed' });
  }
  public async listAll(request: Request, response: Response) {
    const listAll = container.resolve(ListAllCategorysService);
    const category = await listAll.execute();
    return response.status(200).json(category);
  }
}
