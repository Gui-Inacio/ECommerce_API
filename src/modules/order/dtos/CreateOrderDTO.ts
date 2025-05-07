import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createOrderSchema = z.object({
  status: z.string().min(1),
  total: z
    .number()
    .positive()
    .transform((val) => parseFloat(val.toFixed(2))),
  user: z.string().uuid(),
});

export class CreateOrderDTO extends AbstractDTO<typeof createOrderSchema> {
  protected rules() {
    return createOrderSchema;
  }
}
export type CreateOrder = z.infer<typeof createOrderSchema>;
