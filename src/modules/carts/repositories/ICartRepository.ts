import { StrictOmit } from '@/shared/util/types/StrictOmitType';
import { Cart } from '../infra/typeorm/entities/Cart';

export type CartSaveInput = StrictOmit<Cart, 'id' | 'cartItems' | 'user'>;
export type CartUpdate = StrictOmit<Cart, 'cartItems' | 'user'>;

interface ICartRepository {
  create(data: CartSaveInput): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
  listAll(): Promise<Cart[]>;
  delete(id: string): Promise<void>;
  update(data: CartUpdate): Promise<void>;
}

export { ICartRepository };
