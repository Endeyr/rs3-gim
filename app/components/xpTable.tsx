'use client'

import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { capitalizeFirstLetter, isPlayerOutOfDate } from '@/lib/utils'
import { PlayerContextI } from '@/types/context'
import { PlayerDataI } from '@/types/playerData'
import { RefreshCw, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { PlayerContext } from '../context/playerContext'

export interface XpTableI {
	playerData: PlayerDataI
}

const XpTable: React.FC<XpTableI> = ({ playerData }) => {
	const { removePlayerData, updatePlayerData } = useContext(
		PlayerContext
	) as PlayerContextI
	const pathname = usePathname()

	const isOutOfDate = playerData ? isPlayerOutOfDate(playerData) : true

	if (!playerData) {
		return null
	}

	return (
		<>
			<div
				className="flex justify-center items-center gap-2 w-full"
				role="group"
				aria-labelledby="player-actions"
			>
				{pathname !== `/profile/${playerData.username}` ? (
					<>
						<Link className="w-full" href={`profile/${playerData.username}`}>
							<Button
								className="text-center w-full"
								variant={'ghost'}
								aria-label={`Go to ${playerData.username}'s profile`}
							>
								{playerData.username}
							</Button>
						</Link>
						<Button
							size={'icon'}
							variant={'ghost'}
							onClick={() => removePlayerData(playerData.username)}
							aria-label={`Remove ${playerData.username} from data`}
							aria-disabled={isOutOfDate ? 'true' : 'false'}
						>
							<Trash2 />
						</Button>
					</>
				) : (
					<>
						<h2 id="player-actions">{playerData.username}</h2>
						{!isOutOfDate && (
							<Button
								size={'icon'}
								variant={'ghost'}
								onClick={() => updatePlayerData(playerData)}
								aria-label={`Refresh ${playerData.username}'s data`}
							>
								<RefreshCw />
							</Button>
						)}
					</>
				)}
			</div>
			<Table className="xl:text-[12px] lg:text-[16px] px-2">
				<TableCaption>
					Last Updated: {new Date(playerData.timestamp).toLocaleString()}
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead scope="col">Skill</TableHead>
						<TableHead scope="col" className="text-right">
							Rank
						</TableHead>
						<TableHead scope="col" className="text-right">
							Level
						</TableHead>
						<TableHead scope="col" className="text-right">
							Experience
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.entries(playerData.skills).map(([skill, data]) => (
						<TableRow key={skill}>
							<TableCell>{capitalizeFirstLetter(skill)}</TableCell>
							<TableCell className="text-right">
								{(data.rank || 0).toLocaleString()}
							</TableCell>
							<TableCell className="text-right">{data.level || 0}</TableCell>
							<TableCell className="text-right">
								{(data.experience || 0).toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
export default XpTable
