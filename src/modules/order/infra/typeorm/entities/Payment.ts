import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Order } from './Order';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';

@Entity('payments')
export class Payment extends AbstractEntity {
  @Column()
  status: string;

  @Column()
  method: string;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
