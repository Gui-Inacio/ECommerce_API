import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '../repositories/IAddressRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class SetDefaultAdressService {
  constructor(
    @inject('AddressRepository')
    private readonly addressRepository: IAddressRepository,
  ) {}
  async execute(addressId: string, userId: string) {
    const address = await this.addressRepository.findById(addressId);

    if (!address || address.user.id !== userId) {
      throw new NotFound('Address not found or unauthorized.');
    }
    await this.addressRepository.updateManyAsNotDefault(userId);
    await this.addressRepository.setDefault(addressId);
  }
}
