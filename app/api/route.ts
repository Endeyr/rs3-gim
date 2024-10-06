import { getPlayer } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const username = searchParams.get('username')
	const gamemode = searchParams.get('gamemode')
	try {
		const player = await getPlayer(
			username as string,
			gamemode as 'normal' | 'ironman' | 'hardcore'
		)
		if (!player) {
			return NextResponse.json({ error: 'Player not found' }, { status: 404 })
		}
		return NextResponse.json(player, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Failed to fetch player data' },
			{ status: 500 }
		)
	}
}
