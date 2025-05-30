import { Router } from 'express';

import { OrderController } from '../infra/http/controller/OrderController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post('/create/', isAuth, orderController.createOrder);
orderRouter.get('/', isAuth, orderController.listAll);
orderRouter.post('/:order_id/finalize', isAuth, orderController.finalizeOrder);

export { orderRouter };
