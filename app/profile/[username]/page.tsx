'use client'

import XpChart, {
	exampleChartConfig,
	exampleChartData,
} from '@/app/components/xpChart'
import XpChartForm from '@/app/components/xpChartForm'
import XpTable from '@/app/components/xpTable'
import { PlayerContext } from '@/app/context/playerContext'
import { PlayerContextI } from '@/types/context'
import { useContext } from 'react'

interface ProfilePagePropsI {
	params: { username: string }
}

const ProfilePage = ({ params }: ProfilePagePropsI) => {
	const { username } = params
	const { playerDataArray } = useContext(PlayerContext) as PlayerContextI

	const userData = playerDataArray.find((player) => player.name === username)

	// const userXpData = {}

	if (!userData) return <div>PlayerData not found</div>
	// TODO update chart based on player data, make a call to the getMonthlyXp endpoint

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 w-full space-x-2 space-y-4">
			<div className="col-span-1 px-2">
				<XpTable playerData={userData} />
			</div>
			<div className="lg:col-span-2 col-span-1 px-2 justify-center items-start h-full w-[98%]">
				<XpChartForm username={userData.name} />
				<XpChart
					chartData={exampleChartData}
					chartConfig={exampleChartConfig}
					chartDescription={`Skill`}
					chartTitle={`${userData.name}`}
					chartFooterDate="Jan - Feb"
					chartFooterDescription="XP Gained by Skill"
				/>
			</div>
			<div>Questing Goes Here?</div>
		</div>
	)
}
export default ProfilePage
