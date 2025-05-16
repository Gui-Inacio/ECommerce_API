import { Check, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Order } from './Order';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';
import { Product } from '@/modules/products/infra/typeorm/entities/Products';

@Entity('order_items')
export class OrderItem extends AbstractEntity {
  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItem)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
