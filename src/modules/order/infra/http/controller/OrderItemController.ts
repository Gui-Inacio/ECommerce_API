import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrderItemDTO } from '@/modules/order/dtos/CreateOrderItemDTO';
import { CreateOrderItemService } from '@/modules/order/services/OrderItemServices/CreateOrderItemService';
import { ListAllOrderItemsByOrderService } from '@/modules/order/services/OrderItemServices/ListAllOrderItemByOrderService';
export class OrderItemController {
  public async createOrderItem(request: Request, response: Response) {
    const requestValidated = new CreateOrderItemDTO(request.body);

    const createOrderItemService = container.resolve(CreateOrderItemService);

    const createOrderItem = await createOrderItemService.execute(
      requestValidated.getAll(),
    );
    return response.status(201).json(createOrderItem);
  }
  public async ListAllOrderItemByOrder(request: Request, response: Response) {
    const listAllOrderItemByOrderService = container.resolve(
      ListAllOrderItemsByOrderService,
    );
    const order = request.params.id;
    const orderItems = await listAllOrderItemByOrderService.execute(order);

    return response.status(200).json(orderItems);
  }
}
