import { Response } from 'express';
import { container } from 'tsyringe';

import { GetOrCreateCartService } from '@/modules/carts/services/GetOrCreateCartService';

export class CartController {
  public async getOrCreate(response: Response) {
    const userId = response.locals.userId;

    const getOrCreateCart = container.resolve(GetOrCreateCartService);
    const cart = await getOrCreateCart.execute(userId);

    return response.json(cart);
  }
}
