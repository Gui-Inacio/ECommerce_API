import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAddressService } from '@/modules/address/services/CreateAddressService';

export class AddressController {
  public async createAddress(request: Request, response: Response) {
    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute(request.body);

    return response.status(201).json(address);
  }
}
