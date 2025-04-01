import { Router } from 'express';

import ProductController from '../infra/http/controller/ProductsController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/create', productController.createProduct);
productRouter.get('/:id', productController.findProductById);
productRouter.get('/', productController.ListAllProducts);

export { productRouter };
