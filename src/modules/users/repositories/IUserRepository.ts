import { User } from '../infra/typeorm/entities/User';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type UserSaveInput = StrictOmit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'generateUuid'
>;
export type UserUpdateInput = Pick<User, 'id' | 'password'>;

interface IUserRepository {
  create(data: UserSaveInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updatePassword(data: UserUpdateInput): Promise<void>;
  userLogin(email: string): Promise<User | null>;
}

export { IUserRepository };
