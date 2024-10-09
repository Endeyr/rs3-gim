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
import { PlayerDataI } from '@/types/playerData'

export interface XpTableI {
	playerData: PlayerDataI
}

const XpTable: React.FC<XpTableI> = ({ playerData }) => {
	if (!playerData) {
		return null
	}

	return (
		<>
			<h1 className="text-center w-full">{playerData.username}</h1>
			{/* TODO Add remove from table button */}
			{/* TODO Add go to profile button - display chart + historic xp gains */}
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
