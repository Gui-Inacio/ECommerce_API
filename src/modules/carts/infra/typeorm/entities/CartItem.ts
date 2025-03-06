import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Cart } from './Cart';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntity';
import { Product } from '@/modules/products/infra/typeorm/entities/Products';

@Entity('cart_items')
export class CartItem extends AbstractEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
