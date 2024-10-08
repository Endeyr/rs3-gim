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
import { hiscores } from '@/lib/const'
import { SearchBarFormProps } from '@/types/searchBarForm'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, { message: 'Username must be at least 1 character.' })
		.max(12, { message: 'Username cannot exceed 12 characters' })
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: 'Username can only contain letters, numbers, and underscores.',
		}),
	gamemode: z.enum(hiscores.gamemodes),
})

const SearchBarForm: React.FC<SearchBarFormProps> = ({
	setPlayerData,
	setUsername,
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			gamemode: 'normal',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			setError('')
			setUsername(values.name)
			localStorage.setItem('username', values.name)
			const response = await axios(
				`/api?username=${encodeURIComponent(values.name)}&gamemode=${
					values.gamemode
				}`,
				{ timeout: 10000 }
			)
			setPlayerData(response.data)
			localStorage.setItem('playerData', JSON.stringify(response.data))
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(
					error.response?.status === 404
						? 'Player not found.'
						: 'An error occurred.'
				)
			} else {
				setError(`An unexpected error occurred; ${error}`)
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Gamemode" />
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
				<Button type="submit" disabled={isLoading}>
					{!isLoading ? 'Search' : 'Loading...'}
				</Button>
			</form>
			{error && (
				<p className="text-red-500 mt-2" aria-live="polite">
					{error}
				</p>
			)}
		</Form>
	)
}
export default SearchBarForm
