import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const finalizeOrderSchema = z.object({
  order_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export class FinalizeOrderDTO extends AbstractDTO<typeof finalizeOrderSchema> {
  protected rules() {
    return finalizeOrderSchema;
  }
}
export type FinalizeOrder = z.infer<typeof finalizeOrderSchema>;
