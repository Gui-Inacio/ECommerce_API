import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const cancelOrderSchema = z.object({
  order_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export class CancelOrderDTO extends AbstractDTO<typeof cancelOrderSchema> {
  protected rules() {
    return cancelOrderSchema;
  }
}
export type CancelOrder = z.infer<typeof cancelOrderSchema>;
