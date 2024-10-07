import { SetStateAction } from 'react'
import type { PlayerDataI } from './playerData'

export interface SearchBarFormProps {
	setPlayerData: React.Dispatch<SetStateAction<PlayerDataI | null>>
	setUsername: React.Dispatch<SetStateAction<string>>
}
