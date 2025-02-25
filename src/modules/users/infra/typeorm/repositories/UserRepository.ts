import { injectable } from 'tsyringe';

import { User } from '../entities/User';
import type {
  IUserRepository,
  UserSaveInput,
  UserUpdateInput,
} from '../../../repositories/IUserRepository';

import { AppDataSource } from '@/shared/infra/typeorm';
import { hashPassword } from '@/shared/util/Password';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class UserRepository
  extends AbstractTransactionRepository<User>
  implements IUserRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, User);
  }

  private readonly userRepository = AppDataSource.getRepository(User);

  async create(data: UserSaveInput) {
    const user = this.userRepository.create({
      ...data,
      password: hashPassword(data.password),
    });
    return await this.userRepository.save(user);
  }

  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updatePassword({ id, password }: UserUpdateInput) {
    await this.userRepository.update(
      { id },
      {
        password: hashPassword(password),
      },
    );
  }

  async userLogin(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password'],
    });
  }
}
