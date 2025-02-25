import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export class ForgotPasswordDTO extends AbstractDTO<
  typeof forgotPasswordSchema
> {
  protected rules() {
    return forgotPasswordSchema;
  }
}

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
