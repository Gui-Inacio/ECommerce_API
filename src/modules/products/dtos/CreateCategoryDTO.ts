import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createCategorySchema = z.object({
  name: z.string().min(1),
});

export class CreateCategoryDTO extends AbstractDTO<
  typeof createCategorySchema
> {
  protected rules() {
    return createCategorySchema;
  }
}

export type CreateCategory = z.infer<typeof createCategorySchema>;
