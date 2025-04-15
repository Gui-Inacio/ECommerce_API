import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryDTO } from '@/modules/products/dtos/CreateCategoryDTO';
import { CreateCategoryService } from '@/modules/products/services/categoryServices/CreateCategoryService';
import { FindCategoryByIdService } from '@/modules/products/services/categoryServices/FindCategoryByIdService';
import NotFound from '@/shared/errors/notFound';
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

    if (!category) {
      throw new NotFound('Category not found!');
    }
    return response.status(201).json(category);
  }
}
