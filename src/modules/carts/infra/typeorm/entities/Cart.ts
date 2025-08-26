import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { CartItem } from './CartItem';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';
import { User } from '@/modules/users/infra/typeorm/entities/User';

@Entity('carts')
export class Cart extends AbstractEntity {
  @Column({ default: 'active' })
  status: string;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}
