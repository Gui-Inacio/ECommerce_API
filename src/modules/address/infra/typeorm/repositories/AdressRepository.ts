import { injectable } from 'tsyringe';

import { Address } from '../entities/Adress';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { IAddressRepository } from '@/modules/address/repositories/IAddressRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';
import { CreateAddress } from '@/modules/address/dtos/CreateAddressDTO';

@injectable()
export class AddressRepository
  extends AbstractTransactionRepository<Address>
  implements IAddressRepository
{
  private readonly addressRepository = AppDataSource.getRepository(Address);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Address);
  }
  async createAddress(
    data: CreateAddress,
    viaCepData: { city: string; state: string },
  ) {
    const address = this.addressRepository.create({
      ...data,
      user: { id: data.userId },
      complement: data.complement ?? undefined,
      ...viaCepData,
    });
    return await this.addressRepository.save(address);
  }
  async updateManyAsNotDefault(user_id: string): Promise<void> {
    await this.addressRepository.update(
      { user: { id: user_id }, isDefault: true },
      { isDefault: false },
    );
  }
  async findAllAddressByUser(user_id: string): Promise<Address[]> {
    return await this.addressRepository.find({
      where: { user: { id: user_id } },
    });
  }
}
