import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z
    .number()
    .positive()
    .transform((val) => parseFloat(val.toFixed(2))),
  stock: z.number(),
  category: z.string(),
});

export class UpdateProductDTO extends AbstractDTO<typeof updateProductSchema> {
  protected rules() {
    return updateProductSchema;
  }
}

export type UpdateProduct = z.infer<typeof updateProductSchema>;
