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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { runemetrics } from '@/lib/const'
import { xpChartFormSchema } from '@/schemas/xpChartFormSchema'
import { PlayerContextI } from '@/types/context'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PlayerContext } from '../context/playerContext'

interface XpChartFormPropsI {
	username: string
}

const XpChartForm = ({ username }: XpChartFormPropsI) => {
	const { updateIsLoading, setStatus, isLoading, isError, message, isSuccess } =
		useContext(PlayerContext) as PlayerContextI

	const form = useForm<z.infer<typeof xpChartFormSchema>>({
		resolver: zodResolver(xpChartFormSchema),
		defaultValues: {
			skillName: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof xpChartFormSchema>) => {
		// separate loading state for each component vs whole loading screen?
		updateIsLoading(true)
		setStatus('', 'reset')

		// check if existing
		// const existingPlayer = undefined
		// check if out of date
		const isOutOfDate = true

		if (isOutOfDate) {
			try {
				const monthlyXpResponse = await axios(
					`/api/runemetrics/getMonthlyXp?name=${username}&skillId=${values.skillName}`
				)
				// update Xp Chart Data
				console.log(monthlyXpResponse.data)

				// only update when new month by timestamp?
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
						aria-labelledby="xp-chart-form-legend"
					>
						<legend id="search-options" className="sr-only">
							Search Options
						</legend>
						<FormField
							control={form.control}
							name="skillName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Skill</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={isLoading}
											aria-label="Select a skill"
											aria-required="true"
											aria-invalid={!!form.formState.errors.skillName}
										>
											<SelectTrigger
												className="w-[180px]"
												aria-expanded={!!field.value}
											>
												<SelectValue placeholder="Select a Skill" />
											</SelectTrigger>
											<SelectContent>
												{Object.entries(runemetrics.skills).map(
													([id, skillName]) => (
														<SelectItem key={id} value={id}>
															{skillName}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
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
export default XpChartForm
