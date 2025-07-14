import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import { IAddressRepository } from '../repositories/IAddressRepository';
import { CreateAddress } from '../dtos/CreateAddressDTO';

import { SetAllAsNotDefaultService } from './SetAllAsNotDefaultService';

import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import NotFound from '@/shared/errors/notFound';
import { AddressResponse } from '@/shared/services/ViaCepService';

@injectable()
export class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private readonly addressRepository: IAddressRepository,
    private readonly setAllAsNotDefaultService: SetAllAsNotDefaultService,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(data: CreateAddress) {
    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new NotFound('User not found.');
    }
    //Consulta API ViaCEP

    const response = await axios.get<AddressResponse>(
      `https://viacep.com.br/ws/${data.cep}/json/`,
    );

    const { localidade, uf } = response.data;
    if (data.isDefault) {
      await this.setAllAsNotDefaultService.execute(data.userId);
    }

    const address = await this.addressRepository.createAddress(
      {
        cep: data.cep,
        street: data.street,
        number: data.number,
        neighborhood: data.neighborhood,
        complement: data.complement ?? null,
        isDefault: data.isDefault ?? false,
        userId: data.userId,
      },
      { city: localidade, state: uf },
    );
    return address;
  }
}
