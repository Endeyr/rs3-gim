import { getProfileData } from '@/lib/api/runemetrics'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const name = searchParams.get('name')
	try {
		if (!name) {
			return NextResponse.json({ error: 'Name is required' }, { status: 400 })
		}
		const data = await getProfileData(name)

		if (!data) {
			return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
		}
		return NextResponse.json(data, { status: 200 })
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
