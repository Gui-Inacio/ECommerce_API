import { inject, injectable } from 'tsyringe';

import { IOrderItemRepository } from '../../repositories/IOrderItemRepository';
import { CreateOrderitem } from '../../dtos/CreateOrderItemDTO';
import { FindOrderByIdService } from '../OrderServices/FindOrderByIdService';

import { FindProductsByIdService } from '@/modules/products/services/productsServices/FindProductsByIdService';
import NotFound from '@/shared/errors/notFound';

@injectable()
export class CreateOrderItemService {
  constructor(
    @inject('OrderItemRepository')
    private readonly orderItemRepository: IOrderItemRepository,
    private readonly findProductByIdService: FindProductsByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
  ) {}

  async execute(data: CreateOrderitem) {
    const product = await this.findProductByIdService.execute(data.product);
    const order = await this.findOrderByIdService.execute(data.order);
    if (!product || !order) {
      throw new NotFound('Product or Order not found.');
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
