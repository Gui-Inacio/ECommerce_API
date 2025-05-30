import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrderDTO } from '@/modules/order/dtos/CreateOrderDTO';
import { CreateOrderService } from '@/modules/order/services/OrderServices/CreateOrderService';
import { ListAllOrderService } from '@/modules/order/services/OrderServices/ListAllOrderService';
import { FinalizeOrderService } from '@/modules/order/services/OrderServices/FinalizeOrderService';
export class OrderController {
  public async createOrder(request: Request, response: Response) {
    const requestValidated = new CreateOrderDTO(request.body);

    const createOrderService = container.resolve(CreateOrderService);

    const createdOrder = await createOrderService.execute(
      requestValidated.getAll(),
    );
    return response.status(201).json(createdOrder);
  }
  public async listAll(request: Request, response: Response) {
    const listAllOrderService = container.resolve(ListAllOrderService);
    const orders = await listAllOrderService.execute();

    return response.status(200).json(orders);
  }
  public async finalizeOrder(request: Request, response: Response) {
    const user_id = response.locals.userId;
    const { order_id } = request.params;
    const finalizeOrderService = container.resolve(FinalizeOrderService);
    const finalizedOrder = await finalizeOrderService.execute({
      order_id,
      user_id,
    });
    return response.json(finalizedOrder);
  }
}
