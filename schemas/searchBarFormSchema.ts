import { hiscores } from '@/lib/const'
import { z } from 'zod'

export const formSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, { message: 'Username must be at least 1 character.' })
		.max(12, { message: 'Username cannot exceed 12 characters' })
		.regex(/^(?!.*__)(?!.* _)(?! _)[a-zA-Z0-9][a-zA-Z0-9_ ]*[a-zA-Z0-9]$/, {
			message:
				'Username can only contain letters, numbers, spaces, and underscores, and cannot start or end with an underscore or space.',
		}),
	gamemode: z.enum(hiscores.gamemodes),
})
