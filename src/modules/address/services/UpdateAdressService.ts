import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '../repositories/IAddressRepository';
import { UpdateAddress } from '../dtos/UpdateAddressDTO';

import Unauthorized from '@/shared/errors/unauthorized';

@injectable()
export class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private readonly addressRepository: IAddressRepository,
  ) {}

  async execute(userId: string, data: UpdateAddress) {
    const address = await this.addressRepository.findById(data.id);
    if (!address || address.user.id !== userId) {
      throw new Unauthorized('Address not found or access denied.');
    }
    await this.addressRepository.updateAddress(data);
  }
}
