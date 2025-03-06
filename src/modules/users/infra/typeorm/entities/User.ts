import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';
import { Order } from '@/modules/order/infra/typeorm/entities/Order';
import { Cart } from '@/modules/carts/infra/typeorm/entities/Cart';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @OneToOne(() => Cart, (cart) => cart.user, { onDelete: 'CASCADE' })
  cart: Cart;
}
