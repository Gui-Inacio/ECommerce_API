import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrderDTO } from '@/modules/order/dtos/CreateOrderDTO';
import { CreateOrderService } from '@/modules/order/services/OrderServices/CreateOrderService';
export class OrderController {
  public async createOrder(request: Request, response: Response) {
    const requestValidated = new CreateOrderDTO(request.body);

    const createOrderService = container.resolve(CreateOrderService);

    const createdOrder = await createOrderService.execute(
      requestValidated.getAll(),
    );
    return response.status(201).json(createdOrder);
  }
}
