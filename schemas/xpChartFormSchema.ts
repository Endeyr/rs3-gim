import { z } from 'zod';

export const xpChartFormSchema = z.object({
  skillName: z
    .string()
    .trim()
    .min(1, { message: 'Skill must be provided' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Skill can only contain letters.',
    }),
});
