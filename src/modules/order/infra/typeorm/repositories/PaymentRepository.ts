import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { injectable } from 'tsyringe';
import { Payment } from '../entities/Payment';
import {
  IPaymentRepository,
  PaymentSaveInput,
  PaymentUpdate,
} from '@/modules/order/repositories/IPaymentRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class PaymentRepository
  extends AbstractTransactionRepository<Payment>
  implements IPaymentRepository
{
  private readonly paymentRepository = AppDataSource.getRepository(Payment);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Payment);
  }
  async create(data: PaymentSaveInput) {
    const payment = this.paymentRepository.create(data);
    return await this.paymentRepository.save(payment);
  }
  async findById(id: string) {
    return await this.paymentRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.paymentRepository.find();
  }
  async delete(id: string) {
    await this.paymentRepository.delete(id);
  }
  async update(data: PaymentUpdate) {
    await this.paymentRepository.update({ id: data.id }, data);
  }
}
