import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '../repositories/IAddressRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class DeleteAddressByIdService {
  constructor(
    @inject('AddressRepository')
    private readonly addressRepository: IAddressRepository,
  ) {}
  async execute(id: string) {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new NotFound('Address not found.');
    }
    await this.addressRepository.deleteById(id);
  }
}
