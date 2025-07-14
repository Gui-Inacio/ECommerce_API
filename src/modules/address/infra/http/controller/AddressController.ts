import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAddressService } from '@/modules/address/services/CreateAddressService';
import { FindAllAddressByUserService } from '@/modules/address/services/FindAllAddressByUserService';
import { FindAddressByIdService } from '@/modules/address/services/FindAddressByIdService';
import { FindDefaultByUserService } from '@/modules/address/services/FindDefaultByUserIdService';
import { DeleteAddressByIdService } from '@/modules/address/services/DeleteAddressByIdService';
import { SetDefaultAdressService } from '@/modules/address/services/SetDefaultAdressService';
import { UpdateAddressService } from '@/modules/address/services/UpdateAdressService';
import { UpdateAddressDTO } from '@/modules/address/dtos/UpdateAddressDTO';

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
  public async findDefaultByUser(request: Request, response: Response) {
    const { user } = request.params;
    const findDefaultByUserService = container.resolve(
      FindDefaultByUserService,
    );
    const address = await findDefaultByUserService.execute(user);

    return response.status(200).json(address);
  }
  public async deleteById(request: Request, response: Response) {
    const { id } = request.params;
    if (!id || typeof id !== 'string') {
      return response
        .status(400)
        .json({ message: 'Invalid or missing ID parameter.' });
    }
    const deleteAddressByIdService = container.resolve(
      DeleteAddressByIdService,
    );
    await deleteAddressByIdService.execute(id);
    return response
      .status(200)
      .json({ message: 'Address successfully removed' });
  }
  public async setDefault(request: Request, response: Response) {
    const userId: string = response.locals.userId;
    const addressId = request.params.id;

    const setDefaultAdressService = container.resolve(SetDefaultAdressService);
    await setDefaultAdressService.execute(addressId, userId);
    return response.status(200).json({ message: 'Address set as default.' });
  }
  public async updateAdress(request: Request, response: Response) {
    const requestValidated = new UpdateAddressDTO({
      id: request.params.id,
      ...request.body,
    });
    const userId = response.locals.userId;

    const updateAddressService = container.resolve(UpdateAddressService);
    await updateAddressService.execute(userId, requestValidated.getAll());
    return response
      .status(200)
      .json({ message: 'Address updated successfully.' });
  }
}
