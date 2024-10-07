import { getPlayer } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const username = searchParams.get('username')
	const gamemode = searchParams.get('gamemode')
	try {
		if (!username) {
			return NextResponse.json(
				{ error: 'Username is required' },
				{ status: 400 }
			)
		}
		const player = await getPlayer(
			username,
			gamemode as 'normal' | 'ironman' | 'hardcore'
		)
		return NextResponse.json(player, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Unknown error occurred',
			},
			{ status: 500 }
		)
	}
}
