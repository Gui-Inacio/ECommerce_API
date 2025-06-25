import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/users/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/infra/typeorm/repositories/UserRepository';

import { IProductsRepository } from '@/modules/products/repositories/IProductsRepository';
import { ProductRepository } from '@/modules/products/infra/typeorm/repositories/ProductsRepository';
import { ICategoryRepository } from '@/modules/products/repositories/ICategoryRepository';
import { CategoryRepository } from '@/modules/products/infra/typeorm/repositories/CategoryRepository';
import { IOrderRepository } from '@/modules/order/repositories/IOrderRepository';
import { OrderRepository } from '@/modules/order/infra/typeorm/repositories/OrderRepository';
import { IOrderItemRepository } from '@/modules/order/repositories/IOrderItemRepository';
import { OrderItemRepository } from '@/modules/order/infra/typeorm/repositories/OrderItemRepository';
import { IAddressRepository } from '@/modules/address/repositories/IAddressRepository';
import { AddressRepository } from '@/modules/address/infra/typeorm/repositories/AdressRepository';

container.register<IUserRepository>('UserRepository', UserRepository);
container.register<IProductsRepository>('ProductRepository', ProductRepository);
container.register<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
container.register<IOrderRepository>('OrderRepository', OrderRepository);
container.register<IOrderItemRepository>(
  'OrderItemRepository',
  OrderItemRepository,
);
container.register<IAddressRepository>('AddressRepository', AddressRepository);
