import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createOrderSchema = z.object({
  user: z.string().uuid(),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
});

export class CreateOrderDTO extends AbstractDTO<typeof createOrderSchema> {
  protected rules() {
    return createOrderSchema;
  }
}
export type CreateOrder = z.infer<typeof createOrderSchema>;
