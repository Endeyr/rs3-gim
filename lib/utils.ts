import { PlayerDataI } from '@/types/playerData'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { MAX_AGE } from './const'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isPlayerOutOfDate = (playerData: PlayerDataI): boolean => {
	const timeDifference = Date.now() - new Date(playerData.timestamp).getTime()

	return timeDifference > MAX_AGE
}
