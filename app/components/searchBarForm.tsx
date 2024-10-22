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
import { isPlayerOutOfDate } from '@/lib/utils'
import { searchBarFormSchema } from '@/schemas/searchBarFormSchema'
import { PlayerContextI } from '@/types/context'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PlayerContext } from '../context/playerContext'

const SearchBarForm: React.FC = () => {
	const {
		playerDataArray,
		updatePlayerData,
		updateIsLoading,
		setStatus,
		isLoading,
		isError,
		message,
		isSuccess,
	} = useContext(PlayerContext) as PlayerContextI

	const form = useForm<z.infer<typeof searchBarFormSchema>>({
		resolver: zodResolver(searchBarFormSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof searchBarFormSchema>) => {
		updateIsLoading(true)
		setStatus('', 'reset')

		const existingPlayer = playerDataArray.find(
			(player) => player.name === values.name
		)
		const isOutOfDate = !existingPlayer || isPlayerOutOfDate(existingPlayer)

		if (isOutOfDate) {
			try {
				const [profileResponse, questResponse] = await Promise.all([
					axios(
						`/api/runemetrics/getProfile?name=${encodeURIComponent(
							values.name
						)}`,
						{
							timeout: 10000,
						}
					),
					axios(
						`/api/runemetrics/getQuest?name=${encodeURIComponent(values.name)}`,
						{
							timeout: 10000,
						}
					),
				])
				const data = {
					...profileResponse.data,
					quests: questResponse.data.quests,
				}
				updatePlayerData(data)
				setStatus('Player data updated successfully.', 'success')
				form.reset()
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.log(error)
					setStatus(
						error.response?.status === 500
							? 'Player not found.'
							: error.response
							? error.response.data.error
							: 'An error occurred',
						'error'
					)
				} else {
					setStatus(`An unexpected error occurred; ${error}`, 'error')
					console.error(`Unexpected error: ${error}`)
				}
			} finally {
				updateIsLoading(false)
			}
		} else {
			updateIsLoading(false)
			setStatus('Player data is up to date.', 'error')
		}
	}

	return (
		<div className="w-full mx-auto px-2">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-full flex flex-col justify-evenly items-center"
					aria-busy={isLoading}
					aria-live="polite"
				>
					<fieldset
						disabled={isLoading}
						className="space-y-4 w-full"
						aria-labelledby="search-form-legend"
					>
						<legend id="search-options" className="sr-only">
							Search Options
						</legend>
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
											aria-describedby="username-description username-error"
											aria-invalid={!!form.formState.errors.name}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>
					<div className="w-full">
						<Button type="submit" disabled={isLoading}>
							{!isLoading ? 'Add' : 'Loading...'}
						</Button>
					</div>
				</form>
			</Form>
			{message && (
				<p
					className={`mt-2 w-full break-words ${
						isError
							? 'text-red-500'
							: isSuccess
							? 'text-green-500'
							: 'text-primary'
					}`}
					role={isError ? 'alert' : isSuccess ? 'status' : ''}
					aria-live="polite"
					aria-atomic="true"
				>
					{message}
				</p>
			)}
		</div>
	)
}
export default SearchBarForm
