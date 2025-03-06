import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Category } from './Category';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';
import { OrderItem } from '@/modules/order/infra/typeorm/entities/OrderItem';
import { CartItem } from '@/modules/carts/infra/typeorm/entities/CartItem';

@Entity('products')
export class Product extends AbstractEntity {
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

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];
}
