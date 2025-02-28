import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Category } from './Category';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';

@Entity('products')
export class Products extends AbstractEntity {
  @Column({ name: 'product_name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
