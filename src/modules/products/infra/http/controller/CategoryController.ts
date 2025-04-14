import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryDTO } from '@/modules/products/dtos/CreateCategoryDTO';
import { CreateCategoryService } from '@/modules/products/services/categoryServices/CreateCategoryService';
export class CategoryController {
  public async createCategory(request: Request, response: Response) {
    const requestValidated = new CreateCategoryDTO(request.body);

    const createCategoryService = container.resolve(CreateCategoryService);

    const createdCategory = await createCategoryService.execute(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdCategory);
  }
}
