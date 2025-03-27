import { StrictOmit } from '@/shared/util/types/StrictOmitType';
import { CartItem } from '../infra/typeorm/entities/CartItem';

export type CartItemSaveImput = StrictOmit<CartItem, 'id' | 'product' | 'cart'>;
export type CartItemUpdate = StrictOmit<CartItem, 'product' | 'cart'>;

interface IcartItemRepository {
  create(data: CartItemSaveImput): Promise<CartItem>;
  findById(id: string): Promise<CartItem | null>;
  listAll(): Promise<CartItem[]>;
  delete(id: string): Promise<void>;
  update(data: CartItemUpdate): Promise<void>;
}

export { IcartItemRepository };
