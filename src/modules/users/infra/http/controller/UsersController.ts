import { Request, Response } from 'express';

import { CreateUserService } from '../../../services/CreateUserService';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';

import { container } from '@/shared/container/providers/transaction-manager/ContainerResolveTransaction';

export class UsersController {
  async createUser(request: Request, response: Response) {
    const requestValidated = new CreateUserDTO(request.body);

    const addUserService = container.resolve(CreateUserService);

    const createdUser = await addUserService.execute(requestValidated.getAll());

    return response.status(201).json(createdUser);
  }
}
