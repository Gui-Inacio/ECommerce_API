import { Category } from '../infra/typeorm/entities/Category';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type CategorySaveInput = StrictOmit<
  Category,
  'id' | 'products' | 'createdAt' | 'updatedAt' | 'generateUuid'
>;
export type CategoryUpdate = StrictOmit<
  Category,
  'products' | 'updatedAt' | 'generateUuid' | 'createdAt'
>;

interface ICategoryRepository {
  create(data: CategorySaveInput): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  listAll(): Promise<Category[]>;
  delete(id: string): Promise<void>;
  update(data: CategoryUpdate): Promise<void>;
  findByName(name: string): Promise<Category | null>;
}

export { ICategoryRepository };
