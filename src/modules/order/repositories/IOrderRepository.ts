import { Order } from '../infra/typeorm/entities/Order';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type OrderSaveInput = StrictOmit<Order, 'id' | 'payments' | 'orderItem'>;
export type OrderUpdate = StrictOmit<Order, 'payments' | 'orderItem'>;

interface IOrderRepository {
  create(data: OrderSaveInput): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  listAll(): Promise<Order[]>;
  delete(id: string): Promise<void>;
  update(data: OrderUpdate): Promise<void>;
}
export { IOrderRepository };
