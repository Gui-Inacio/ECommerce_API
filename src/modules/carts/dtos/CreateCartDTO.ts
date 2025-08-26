import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createCartSchema = z.object({
  userId: z.string().uuid(),
});

export class CreateCartDTO extends AbstractDTO<typeof createCartSchema> {
  protected rules() {
    return createCartSchema;
  }
}

export type CreateCart = z.infer<typeof createCartSchema>;
