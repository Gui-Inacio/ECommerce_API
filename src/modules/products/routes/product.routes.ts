import { Router } from 'express';

import { ProductController } from '../infra/http/controller/ProductsController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/create', productController.createProduct);
productRouter.get('/:id', isAuth, productController.findProductById);
productRouter.get('/', isAuth, productController.ListAllProducts);
productRouter.delete('/delete/:id', isAuth, productController.deleteProduct);
productRouter.put('/update/:id', isAuth, productController.updateProduct);

export { productRouter };
