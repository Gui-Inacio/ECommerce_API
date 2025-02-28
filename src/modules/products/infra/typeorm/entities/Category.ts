import { Column, Entity, OneToMany } from 'typeorm';

import { Products } from './Products';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';

@Entity('categories')
export class Category extends AbstractEntity {
  @Column({ name: 'category_name' })
  name: string;

  @OneToMany(() => Products, (products) => products.category, {
    onDelete: 'CASCADE',
  })
  products: Products[];
}
