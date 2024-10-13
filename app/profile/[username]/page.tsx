'use client'

import XpChart, {
	exampleChartConfig,
	exampleChartData,
} from '@/app/components/xpChart'
import XpTable from '@/app/components/xpTable'
import { PlayerContext } from '@/app/context/playerContext'
import { PlayerContextI } from '@/types/context'
import { useContext } from 'react'

interface ProfilePagePropsI {
	params: { username: string }
}

// TODO display chart + historic xp gains, add refresh button
const ProfilePage = ({ params }: ProfilePagePropsI) => {
	const { username } = params
	const { playerDataArray, isLoading } = useContext(
		PlayerContext
	) as PlayerContextI

	const userData = playerDataArray.find(
		(player) => player.username === username
	)

	if (isLoading) return <div>Loading...</div>

	if (!userData) return <div>PlayerData not found</div>

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 w-full space-x-2">
			<div className="col-span-1 px-2">
				<XpTable playerData={userData} />
			</div>
			<div className="lg:col-span-2 col-span-1 px-2 justify-center items-start h-full w-[98%]">
				<XpChart
					chartData={exampleChartData}
					chartConfig={exampleChartConfig}
					chartDescription=""
					chartTitle=""
					chartFooterDate=""
					chartFooterDescription=""
				/>
			</div>
		</div>
	)
}
export default ProfilePage
