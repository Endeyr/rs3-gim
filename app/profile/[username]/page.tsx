'use client'

import XpTable from '@/app/components/xpTable'
import { PlayerContext } from '@/app/context/playerContext'
import { PlayerContextI } from '@/types/context'
import { useContext } from 'react'

interface ProfilePagePropsI {
	params: { username: string }
}

// TODO display chart + historic xp gains
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
		<>
			<XpTable playerData={userData} />
		</>
	)
}
export default ProfilePage
