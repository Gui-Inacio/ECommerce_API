import { Product } from '../infra/typeorm/entities/Products';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type ProductSaveInput = StrictOmit<
  Product,
  | 'id'
  | 'category'
  | 'cartItems'
  | 'orderItems'
  | 'createdAt'
  | 'updatedAt'
  | 'generateUuid'
>;
export type ProductUpdate = StrictOmit<
  Product,
  | 'category'
  | 'cartItems'
  | 'orderItems'
  | 'createdAt'
  | 'updatedAt'
  | 'generateUuid'
>;

interface IProductsRepository {
  create(data: ProductSaveInput): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  listAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
  update(data: ProductUpdate): Promise<void>;
}

export { IProductsRepository };
