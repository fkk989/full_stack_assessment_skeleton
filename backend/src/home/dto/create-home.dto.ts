import { z } from 'zod';

export const createUserSchema = z.object({}).required({});

export type CreateUserDto = z.infer<typeof createUserSchema>;
