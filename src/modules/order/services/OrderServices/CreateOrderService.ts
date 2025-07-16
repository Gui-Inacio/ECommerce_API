import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '../../repositories/IOrderRepository';
import { CreateOrder } from '../../dtos/CreateOrderDTO';
import { IOrderItemRepository } from '../../repositories/IOrderItemRepository';

import NotFound from '@/shared/errors/notFound';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { IProductsRepository } from '@/modules/products/repositories/IProductsRepository';
import { IAddressRepository } from '@/modules/address/repositories/IAddressRepository';
import Unauthorized from '@/shared/errors/unauthorized';
import { OrderMap } from '@/mappers/OrderMapper';

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
    @inject('OrderItemRepository')
    private readonly orderItemRepository: IOrderItemRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @inject('ProductRepository')
    private readonly productRepository: IProductsRepository,
    @inject('AddressRepository')
    private readonly addressRepository: IAddressRepository,
  ) {}

  async execute(data: CreateOrder) {
    const user = await this.userRepository.findById(data.user);
    if (!user) throw new NotFound('User not found.');
    const address = await this.addressRepository.findById(data.address);
    if (!address || address.user.id !== user.id) {
      throw new Unauthorized('Address not found or acess denied.');
    }
    let total = 0;

    //Validate all products and calculate the total
    const items = await Promise.all(
      data.items.map(async ({ product_id, quantity }) => {
        const product = await this.productRepository.findById(product_id);
        if (!product)
          throw new NotFound(`Product with ID ${product_id} not found.`);

        const price = product.price;

        total += price * quantity;
        return { product, quantity, price };
      }),
    );

    //Create order
    const order = await this.orderRepository.create({
      status: 'pending',
      total,
      user,
      address,
    });

    //Create Order Items
    for (const item of items) {
      await this.orderItemRepository.create({
        order,
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      });
    }
    return OrderMap.toResponse(order);
  }
}
