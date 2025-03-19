import { StrictOmit } from '@/shared/util/types/StrictOmitType';
import { OrderItem } from '../infra/typeorm/entities/OrderItem';

export type OrderItemSaveInput = StrictOmit<
  OrderItem,
  'id' | 'order' | 'product'
>;
export type OrderItemUpdate = StrictOmit<OrderItem, 'order' | 'product'>;

interface IOrderItemRepository {
  create(data: OrderItemSaveInput): Promise<OrderItem>;
  findById(id: string): Promise<OrderItem | null>;
  listAlll(): Promise<OrderItem[]>;
  delete(id: string): Promise<void>;
  update(data: OrderItem): Promise<void>;
}

export { IOrderItemRepository };
