import { PlayerDataI } from '@/types/playerData'

const XpTable = ({ playerData }: { playerData: PlayerDataI }) => {
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Skill</th>
						<th>Rank</th>
						<th>Level</th>
						<th>Experience</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(playerData.skills).map(([skill, data]) => (
						<tr key={skill}>
							<td>{skill}</td>
							<td>{data.rank}</td>
							<td>{data.level}</td>
							<td>{data.experience}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
export default XpTable
