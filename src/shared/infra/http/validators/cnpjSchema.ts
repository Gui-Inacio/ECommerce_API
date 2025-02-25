import { z, ZodRawShape } from 'zod';

export const cnpjSchema = <T extends ZodRawShape>(schema: T) =>
  z.object({
    cnpj: z
      .string()
      .transform((value) => value.replace(/\D/g, ''))
      .refine((value) => {
        return value.length == 14;
      }, 'CNPJ deve conter no 14 caracteres.')
      .refine((value) => {
        return !!Number(value);
      }, 'CNPJ deve conter apenas números.'),
    ...schema,
  });
