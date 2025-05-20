import { inject, injectable } from 'tsyringe';

import { IOrderItemRepository } from '../../repositories/IOrderItemRepository';
import { CreateOrderitem } from '../../dtos/CreateOrderItemDTO';
import { IOrderRepository } from '../../repositories/IOrderRepository';

import NotFound from '@/shared/errors/notFound';
import { IProductsRepository } from '@/modules/products/repositories/IProductsRepository';

@injectable()
export class CreateOrderItemService {
  constructor(
    @inject('OrderItemRepository')
    private readonly orderItemRepository: IOrderItemRepository,
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(data: CreateOrderitem) {
    const product = await this.productRepository.findById(data.product);
    const order = await this.orderRepository.findById(data.order);
    if (!product) {
      throw new NotFound('Product not found.');
    }
    if (!order) {
      throw new NotFound('Order not found.');
    }

    //criar um findOrderById para verificar se a order exist e criar o OrderItem
    return await this.orderItemRepository.create({
      order: order,
      product: product,
      price: data.price,
      quantity: data.quantity,
    });
  }
}
