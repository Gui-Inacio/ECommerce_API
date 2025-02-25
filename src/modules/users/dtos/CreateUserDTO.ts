import { z } from 'zod';

import { passwordSchema } from '@/shared/infra/http/validators/passwordSchema';
import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createUserSchema = passwordSchema({
  name: z.string(),
  email: z.string().email(),
});

export class CreateUserDTO extends AbstractDTO<typeof createUserSchema> {
  protected rules() {
    return createUserSchema;
  }
}

export type CreateUser = z.infer<typeof createUserSchema>;
