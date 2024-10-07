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
import { PlayerDataI } from '@/types/playerData'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Username must be at least 1 character.' })
		.max(12, { message: 'Username cannot exceed 12 characters' }),
	gamemode: z.enum(hiscores.gamemodes),
})

interface SearchBarFormProps {
	setPlayerData: React.Dispatch<SetStateAction<PlayerDataI | null>>
}

const SearchBarForm: React.FC<SearchBarFormProps> = ({ setPlayerData }) => {
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
		setError('')
		try {
			const response = await axios(
				`/api?username=${values.name}&gamemode=${values.gamemode}`
			)
			if (response.status === 200) {
				setPlayerData(response.data)
				localStorage.setItem('playerData', JSON.stringify(response.data))
			} else {
				throw new Error(`Failed to fetch data, status: ${response.status}`)
			}
		} catch (error) {
			setError('Player not found.')
			console.warn(error)
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
								<Input placeholder="Runescape Username" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Gamemode" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="normal">Normal</SelectItem>
						<SelectItem value="ironman">Ironman</SelectItem>
						<SelectItem value="hardcore">Hardcore Ironman</SelectItem>
					</SelectContent>
				</Select>
				<Button type="submit" disabled={isLoading}>
					{!isLoading ? 'Search' : 'Loading...'}
				</Button>
			</form>
			{error && <p className="text-red-500 mt-2">{error}</p>}
		</Form>
	)
}
export default SearchBarForm
