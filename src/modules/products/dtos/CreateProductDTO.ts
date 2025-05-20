import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z
    .number()
    .positive()
    .transform((val) => parseFloat(val.toFixed(2))),
  stock: z.number(),
  category: z.string(),
});

export class CreateProductsDTO extends AbstractDTO<typeof createProductSchema> {
  protected rules() {
    return createProductSchema;
  }
}

export type CreateProduct = z.infer<typeof createProductSchema>;
