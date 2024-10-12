'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { hiscores, MAX_AGE } from '@/lib/const'
import { PlayerContextI } from '@/types/context'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PlayerContext } from '../context/playerContext'

const formSchema = z.object({
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

const SearchBarForm: React.FC = () => {
	const {
		playerDataArray,
		updatePlayerData,
		updateIsLoading,
		updateError,
		isLoading,
		error,
	} = useContext(PlayerContext) as PlayerContextI

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			gamemode: 'normal',
		},
	})

	// TODO: add success message, clear username after search
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		updateIsLoading(true)
		const existingPlayerIndex = playerDataArray.findIndex(
			(player) => player.username === values.name
		)

		let playerOutOfDate
		if (playerDataArray[existingPlayerIndex]) {
			playerOutOfDate =
				existingPlayerIndex !== -1 &&
				Date.now() -
					new Date(playerDataArray[existingPlayerIndex].timestamp).getTime() >
					MAX_AGE
		}

		if (existingPlayerIndex === -1 || playerOutOfDate) {
			try {
				updateError('')
				const response = await axios(
					`/api?username=${encodeURIComponent(values.name)}&gamemode=${
						values.gamemode
					}`,
					{ timeout: 10000 }
				)
				updatePlayerData(response.data)
			} catch (error) {
				if (axios.isAxiosError(error)) {
					updateError(
						error.response?.status === 500
							? 'Player not found.'
							: 'An error occurred, please try again later.'
					)
				} else {
					updateError(`An unexpected error occurred; ${error}`)
					console.error(`Unexpected error: ${error}`)
				}
			} finally {
				updateIsLoading(false)
			}
		} else {
			updateIsLoading(false)
			updateError('Player data is up to date.')
		}
	}

	return (
		<div className="w-full mx-auto px-2">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-full flex flex-col justify-evenly items-center"
					aria-busy={isLoading}
				>
					<fieldset disabled={isLoading} className="space-y-4 w-full">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Runescape Username"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="gamemode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gamemode</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Gamemode">
												{field.value.charAt(0).toUpperCase() +
													field.value.slice(1)}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											{hiscores.gamemodes.map((mode) => (
												<SelectItem key={mode} value={mode}>
													{mode.charAt(0).toUpperCase() + mode.slice(1)}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</fieldset>
					<div className="w-full">
						<Button type="submit" disabled={isLoading}>
							{!isLoading ? 'Search' : 'Loading...'}
						</Button>
					</div>
				</form>
			</Form>
			{error && (
				<p
					className="text-red-500 mt-2 w-full break-words"
					role="alert"
					aria-live="polite"
				>
					{error}
				</p>
			)}
		</div>
	)
}
export default SearchBarForm
