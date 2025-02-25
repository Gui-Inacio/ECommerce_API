import { type ZodRawShape, z } from 'zod';

export const passwordSchema = <T extends ZodRawShape>(schema: T) =>
  z
    .object({
      password: z
        .string()
        .min(8, 'A senha deve conter pelo menos oito caracteres.')
        .regex(
          /(?=.*?[A-Z])/,
          'A senha deve conter pelo menos uma letra maiúscula',
        )
        .regex(
          /(?=.*?[a-z])/,
          'A senha deve conter pelo menos uma letra minúscula',
        )
        .regex(/(?=.*?[0-9])/, 'A senha deve conter pelo menos um número.')
        .regex(
          /(?=.*?[\W_])/,
          'A senha deve conter pelo menos um caractere especial',
        ),
      confirmPassword: z.string({
        required_error: "O campo 'confirmPassword' é obrigatório.",
      }),
      ...schema,
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: 'As senhas não correspondem.',
      path: ['confirmPassword'],
    });
