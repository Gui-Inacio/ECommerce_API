import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Order } from './Order';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';

@Entity('order_items')
export class OrderItem extends AbstractEntity {
  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Order, (order) => order.orderItem)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
