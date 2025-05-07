import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/users/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/infra/typeorm/repositories/UserRepository';

import { IProductsRepository } from '@/modules/products/repositories/IProductsRepository';
import { ProductRepository } from '@/modules/products/infra/typeorm/repositories/ProductsRepository';
import { ICategoryRepository } from '@/modules/products/repositories/ICategoryRepository';
import { CategoryRepository } from '@/modules/products/infra/typeorm/repositories/CategoryRepository';
import { IOrderRepository } from '@/modules/order/repositories/IOrderRepository';
import { OrderRepository } from '@/modules/order/infra/typeorm/repositories/OrderRepository';

container.register<IUserRepository>('UserRepository', UserRepository);
container.register<IProductsRepository>('ProductRepository', ProductRepository);
container.register<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
container.register<IOrderRepository>('OrderRepository', OrderRepository);
