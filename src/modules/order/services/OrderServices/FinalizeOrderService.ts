import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '../../repositories/IOrderRepository';
import { IOrderItemRepository } from '../../repositories/IOrderItemRepository';
import { FinalizeOrder } from '../../dtos/FinalizeOrderDTO';

import { IProductsRepository } from '@/modules/products/repositories/IProductsRepository';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import NotFound from '@/shared/errors/notFound';
import Conflict from '@/shared/errors/conflict';

@injectable()
export class FinalizeOrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
    @inject('OrderItemRepository')
    private readonly orderItemRepository: IOrderItemRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({ order_id, user_id }: FinalizeOrder) {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new NotFound('User not found.');
    }

    const order = await this.orderRepository.findById(order_id);
    if (!order) {
      throw new NotFound('Order not found.');
    }

    if (order.user.id !== user.id) {
      throw new Conflict('This order does not belong to the user.');
    }

    if (order.status === 'finalized') {
      throw new Conflict('Order is already finalized.');
    }

    const items = await this.orderItemRepository.listAllByOrder(order_id);

    if (items.length === 0) {
      throw new Conflict('Cannot finalize an order without items.');
    }

    for (const item of items) {
      const product = await this.productRepository.findById(item.product.id);
      if (!product) {
        throw new NotFound('Product not found.');
      }
      if (product.stock < item.quantity) {
        throw new Conflict(
          `Insuficcient stock for product ${product.name}. Available: ${product.stock}, requested: ${item.quantity}`,
        );
      }
      product.stock -= item.quantity;
      await this.productRepository.save(product);
    }
    order.status = 'finalized';
    await this.orderRepository.save(order);

    return {
      message: 'Order finalized successfully.',
      orderId: order.id,
      total: order.total,
      status: order.status,
    };
  }
}
