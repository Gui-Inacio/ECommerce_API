import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';
import { User } from '@/modules/users/infra/typeorm/entities/User';

@Entity('orders')
export class Order extends AbstractEntity {
  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
