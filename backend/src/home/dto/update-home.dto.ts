import { z } from 'zod';

export const updateUserHomeSchema = z.object({
  usernames: z.array(z.string({ required_error: 'username is required' })),
  street_address: z.string({ required_error: 'street address is required' }),
});

export type UpdateuserHomeDto = z.infer<typeof updateUserHomeSchema>;
