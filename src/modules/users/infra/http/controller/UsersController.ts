import { Request, Response } from 'express';

import { CreateUserService } from '../../../services/CreateUserService';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';

import { container } from '@/shared/container/providers/transaction-manager/ContainerResolveTransaction';
import { FindUserByIdService } from '@/modules/users/services/FindUserByIdService';
import { ViaCepService } from '@/shared/services/ViaCepService';

export class UsersController {
  async createUser(request: Request, response: Response) {
    const requestValidated = new CreateUserDTO(request.body);

    const addUserService = container.resolve(CreateUserService);

    const createdUser = await addUserService.execute(requestValidated.getAll());

    return response.status(201).json(createdUser);
  }
  async findById(request: Request, response: Response) {
    const { id } = request.params;
    const findById = container.resolve(FindUserByIdService);
    const user = await findById.execute(id);
    return response.status(200).json(user);
  }
  async getAddress(request: Request, response: Response) {
    const { cep } = request.params;

    const viaCepService = new ViaCepService();
    const address = await viaCepService.getAddressByCep(cep);

    return response.json(address);
  }
}
