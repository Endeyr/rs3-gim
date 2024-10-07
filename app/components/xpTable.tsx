import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { XPTablePropsI } from '@/types/xpTable'

const XpTable: React.FC<XPTablePropsI> = ({ playerData, username }) => {
	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	return (
		<Table>
			<TableCaption>{username}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Skill</TableHead>
					<TableHead className="text-right">Rank</TableHead>
					<TableHead className="text-right">Level</TableHead>
					<TableHead className="text-right">Experience</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.entries(playerData.skills).map(([skill, data]) => (
					<TableRow key={skill}>
						<TableCell>{capitalizeFirstLetter(skill)}</TableCell>
						<TableCell className="text-right">
							{data.rank.toLocaleString()}
						</TableCell>
						<TableCell className="text-right">{data.level}</TableCell>
						<TableCell className="text-right">
							{data.experience.toLocaleString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
export default XpTable
