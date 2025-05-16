import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createOrderItemSchema = z.object({
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  order: z.string().uuid(),
  product: z.string().uuid(),
});

export class CreateOrderItemDTO extends AbstractDTO<
  typeof createOrderItemSchema
> {
  protected rules() {
    return createOrderItemSchema;
  }
}
export type CreateOrderitem = z.infer<typeof createOrderItemSchema>;
