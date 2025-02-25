import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';
import { passwordSchema } from '@/shared/infra/http/validators/passwordSchema';

const resetPasswordSchema = passwordSchema({
  oldPassword: z.string(),
  userId: z.string(),
});

export class ResetPasswordDTO extends AbstractDTO<typeof resetPasswordSchema> {
  protected rules() {
    return resetPasswordSchema;
  }
}

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
