import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { OrderItem } from './OrderItem';
import { Payment } from './Payment';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';
import { User } from '@/modules/users/infra/typeorm/entities/User';

@Entity('orders')
export class Order extends AbstractEntity {
  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: 'CASCADE',
  })
  orderItem: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order, { onDelete: 'CASCADE' })
  payments: Payment[];
}
