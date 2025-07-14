import { CreateAddress } from '../dtos/CreateAddressDTO';
import { UpdateAddress } from '../dtos/UpdateAddressDTO';
import { Address } from '../infra/typeorm/entities/Adress';

//import { StrictOmit } from '@/shared/util/types/StrictOmitType';

// export type addressSaveImput = StrictOmit<
//   Address,
//   'city' | 'state' | 'id' | 'user'
// >;

interface IAddressRepository {
  createAddress(
    data: CreateAddress,
    viaCepData: {
      city: string;
      state: string;
    },
  ): Promise<Address>;
  updateManyAsNotDefault(user_id: string): Promise<void>;
  findAllAddressByUser(user_id: string): Promise<Address[]>;
  findById(id: string): Promise<Address | null>;
  findDefaultByUser(user_id: string): Promise<Address | null>;
  deleteById(id: string): Promise<void>;
  setDefault(id: string): Promise<void>;
  updateAddress(data: UpdateAddress): Promise<void>;
}

export { IAddressRepository };
