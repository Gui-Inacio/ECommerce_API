import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrderItemDTO } from '@/modules/order/dtos/CreateOrderItemDTO';
import { CreateOrderItemService } from '@/modules/order/services/OrderItemServices/CreateOrderItemService';
export class OrderItemController {
  public async createOrderItem(request: Request, response: Response) {
    const requestValidated = new CreateOrderItemDTO(request.body);

    const createOrderItemService = container.resolve(CreateOrderItemService);

    const createOrderItem = await createOrderItemService.execute(
      requestValidated.getAll(),
    );
    return response.status(201).json(createOrderItem);
  }
}
