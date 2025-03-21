import { StrictOmit } from '@/shared/util/types/StrictOmitType';
import { Payment } from '../infra/typeorm/entities/Payment';

export type PaymentSaveInput = StrictOmit<Payment, 'id' | 'order'>;
export type PaymentUpdate = StrictOmit<Payment, 'order'>;

interface IPaymentRepository {
  create(data: PaymentSaveInput): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  listAll(): Promise<Payment[]>;
  delete(id: string): Promise<void>;
  update(data: PaymentUpdate): Promise<void>;
}

export { IPaymentRepository };
