import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAddressService } from '@/modules/address/services/CreateAddressService';
import { FindAllAddressByUserService } from '@/modules/address/services/FindAllAddressByUserService';
import { FindAddressByIdService } from '@/modules/address/services/FindAddressByIdService';

export class AddressController {
  public async createAddress(request: Request, response: Response) {
    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute(request.body);

    return response.status(201).json(address);
  }
  public async findAllAddressByUser(request: Request, response: Response) {
    const { user } = request.params;
    const findAllAddressByUserService = container.resolve(
      FindAllAddressByUserService,
    );
    const addresses = await findAllAddressByUserService.execute(user);
    return response.status(200).json(addresses);
  }
  public async findById(request: Request, response: Response) {
    const { id } = request.params;
    const findAddressByIdService = container.resolve(FindAddressByIdService);

    const address = await findAddressByIdService.execute(id);

    return response.status(200).json(address);
  }
}
