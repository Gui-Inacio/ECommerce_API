import { Cart } from '../infra/typeorm/entities/Cart';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type CartSaveInput = StrictOmit<
  Cart,
  'id' | 'cartItems' | 'createdAt' | 'updatedAt' | 'generateUuid'
>;
export type CartUpdate = StrictOmit<Cart, 'cartItems' | 'user'>;

interface ICartRepository {
  create(data: CartSaveInput): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
  listAll(): Promise<Cart[]>;
  delete(id: string): Promise<void>;
  update(data: CartUpdate): Promise<void>;
  findActiveByUser(id: string): Promise<Cart[] | null>;
}

export { ICartRepository };
