import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateAddressSchema = z.object({
  id: z.string().uuid(),
  number: z.string(),
  complement: z.string().optional().nullable(),
  street: z.string(),
  neighborhood: z.string(),
});

export class UpdateAddressDTO extends AbstractDTO<typeof updateAddressSchema> {
  protected rules() {
    return updateAddressSchema;
  }
}
export type UpdateAddress = z.infer<typeof updateAddressSchema>;
