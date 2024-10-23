import { getMonthlyXpData } from '@/lib/api/runemetrics';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  console.log(searchParams);
  const name = searchParams.get('name');
  const skillId = searchParams.get('skillId');
  try {
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!skillId || isNaN(Number(skillId))) {
      return NextResponse.json(
        { error: 'Valid skillId is required' },
        { status: 400 }
      );
    }
    const skillIdNum = Number(skillId);
    const data = await getMonthlyXpData(name, skillIdNum);
    if (!data) {
      return NextResponse.json(
        { error: 'Profile not found, please try again later.' },
        { status: 404 }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
