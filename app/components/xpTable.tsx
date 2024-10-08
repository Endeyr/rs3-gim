'use client'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { capitalizeFirstLetter } from '@/lib/utils'
import { PlayerContextI } from '@/types/context'
import { useContext } from 'react'
import { PlayerContext } from '../context/playerContext'

const XpTable: React.FC = () => {
	const { username, playerData } = useContext(PlayerContext) as PlayerContextI

	if (!playerData) {
		return null
	}

	return (
		<Table>
			<TableCaption>{username && username}</TableCaption>
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
	)
}
export default XpTable
