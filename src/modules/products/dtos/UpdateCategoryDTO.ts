import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export class UpdateCategoryDTO extends AbstractDTO<
  typeof updateCategorySchema
> {
  protected rules() {
    return updateCategorySchema;
  }
}

export type UpdateCategory = z.infer<typeof updateCategorySchema>;
