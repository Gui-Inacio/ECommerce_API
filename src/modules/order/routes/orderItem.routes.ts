import { Router } from 'express';

import { OrderItemController } from '../infra/http/controller/OrderItemController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const orderItemRouter = Router();
const orderItemController = new OrderItemController();

orderItemRouter.post('/create', isAuth, orderItemController.createOrderItem);
orderItemRouter.get(
  '/searchOrder/:id',
  isAuth,
  orderItemController.ListAllOrderItemByOrder,
);

export { orderItemRouter };
