import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createAddressSchema = z.object({
  cep: z.string().min(8).max(9),
  number: z.string(),
  complement: z.string().optional().nullable(),
  userId: z.string().uuid(),
  isDefault: z.boolean().optional(),
  street: z.string(),
  neighborhood: z.string(),
});

export class CreateAddressDTO extends AbstractDTO<typeof createAddressSchema> {
  protected rules() {
    return createAddressSchema;
  }
}
export type CreateAddress = z.infer<typeof createAddressSchema>;
