import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../../../../users/infra/typeorm/entities/User';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';
import { Order } from '@/modules/order/infra/typeorm/entities/Order';

@Entity('addresses')
export class Address extends AbstractEntity {
  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;
  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Order, (order) => order.address, { onDelete: 'RESTRICT' })
  orders: Order[];
}
