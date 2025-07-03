import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '../repositories/IAddressRepository';

@injectable()
export class FindAddressByIdService {
  constructor(
    @inject('AddressRepository')
    private readonly addressRepository: IAddressRepository,
  ) {}

  async execute(id: string) {
    const address = await this.addressRepository.findById(id);
    return address;
  }
}
