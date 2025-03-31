import { Router } from 'express';

import ProductController from '../infra/http/controller/ProductsController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/create', productController.createProduct);

export { productRouter };
