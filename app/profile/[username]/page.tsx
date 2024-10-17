'use client'

import XpChart, {
	exampleChartConfig,
	exampleChartData,
} from '@/app/components/xpChart'
import XpChartForm from '@/app/components/xpChartForm'
import XpTable from '@/app/components/xpTable'
import { PlayerContext } from '@/app/context/playerContext'
import type { PlayerContextI } from '@/types/context'
import { useContext } from 'react'

interface ProfilePagePropsI {
	params: { username: string }
}

const ProfilePage = ({ params }: ProfilePagePropsI) => {
	const { username } = params
	const { playerDataArray, monthlyXpDataArray } = useContext(
		PlayerContext
	) as PlayerContextI
	const userData = playerDataArray.find((player) => player.name === username)
	const userXpData = monthlyXpDataArray.find(
		(player) => player.name === username
	)
	if (!userData) return <div>PlayerData not found</div>
	const chartData = userXpData ? userXpData.monthlyXpGain : null
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 w-full space-x-2 space-y-4">
			<div className="col-span-1 px-2">
				<XpTable playerData={userData} />
			</div>
			<div className="lg:col-span-2 col-span-1 px-2 justify-center items-start h-full w-[98%]">
				<XpChartForm username={userData.name} />
				{/* TODO update chart data and config based on userData */}
				{chartData ? (
					<XpChart
						chartData={exampleChartData}
						chartConfig={exampleChartConfig}
						chartDescription={`Xp Gained By Skill`}
						chartTitle={`Xp for ${userData.name}`}
						chartFooterDate="Jan - Feb"
						chartFooterDescription="XP Gained"
					/>
				) : (
					<div>No XP data available for {userData.name}.</div>
				)}
			</div>
			<div>Questing Goes Here?</div>
		</div>
	)
}
export default ProfilePage
