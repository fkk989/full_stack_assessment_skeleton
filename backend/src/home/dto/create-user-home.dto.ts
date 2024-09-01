import { z } from 'zod';

export const createUserHomeSchema = z
  .object({
    users: z
      .array(
        z.object({
          username: z.string({
            required_error: 'usernames cannot be empty',
            message: 'usernames should be string',
          }),
          isChecked: z.boolean(),
        }),
        {
          required_error: 'users is required',
          message: 'users should be array',
        },
      )
      .min(1, { message: 'user cannot be empty' }),
    //
    street_address: z
      .string({ required_error: 'street address is required' })
      .min(1, { message: 'street address cannot be empty' }),
  })
  .required();

export type CreateUserHomeDto = z.infer<typeof createUserHomeSchema>;
