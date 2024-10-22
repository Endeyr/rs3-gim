'use client';

import XpChart from '@/app/components/xpChart';
import XpChartForm from '@/app/components/xpChartForm';
import XpTable from '@/app/components/xpTable';
import { PlayerContext } from '@/app/context/playerContext';
import Container from '@/components/layout/container';
import type { ChartConfig } from '@/components/ui/chart';
import { CHART_COLORS, MONTH_NAMES } from '@/lib/const';
import type { PlayerContextI } from '@/types/context';
import { useContext, useMemo } from 'react';

interface ProfilePagePropsI {
  params: { username: string };
}

const ProfilePage = ({ params }: ProfilePagePropsI) => {
  const { username } = params;
  const { playerDataArray, monthlyXpDataArray } = useContext(
    PlayerContext
  ) as PlayerContextI;

  const {
    userData,
    userXpData,
    chartConfig,
    chartDescription,
    chartFooterDate,
  } = useMemo(() => {
    const userData = playerDataArray.find((player) => player.name === username);
    const userXpData = monthlyXpDataArray.find(
      (player) => player.name === username
    );

    if (!userXpData) {
      return {
        userData,
        userXpData: null,
        chartConfig: {},
        chartDescription: '',
        chartFooterDate: '',
      };
    }
    const { monthlyXpGain } = userXpData;
    const monthDates = monthlyXpGain
      .flatMap((skill) => skill.monthData)
      .map((month) => new Date(month.timestamp))
      .sort((a, b) => a.getTime() - b.getTime());
    const firstMonth = monthDates[0];
    const lastMonth = monthDates[monthDates.length - 1];
    const chartConfig: ChartConfig = monthlyXpGain.reduce(
      (acc, skill, index) => {
        acc[skill.skillName] = {
          label:
            skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1),
          color: CHART_COLORS[index % CHART_COLORS.length],
        };
        return acc;
      },
      {} as ChartConfig
    );

    return {
      userData,
      userXpData,
      chartConfig,
      chartDescription: `XP Gained by ${userXpData.name}`,
      chartFooterDate:
        firstMonth && lastMonth
          ? `${MONTH_NAMES[firstMonth.getMonth()]} - ${
              MONTH_NAMES[lastMonth.getMonth()]
            }`
          : '',
    };
  }, [playerDataArray, monthlyXpDataArray, username]);

  if (!userData) return <div>PlayerData not found</div>;

  return (
    <Container className='grid grid-cols-1 space-x-2 lg:grid-cols-3'>
      <div className='col-span-1 px-2'>
        <XpTable playerData={userData} />
      </div>
      <div className='col-span-1 h-full w-[98%] items-start justify-center space-x-2 space-y-4 px-2 lg:col-span-2'>
        {userXpData ? (
          <XpChart
            chartData={userXpData.monthlyXpGain}
            chartConfig={chartConfig}
            chartDescription={chartDescription}
            chartTitle={`Xp for ${userData.name}`}
            chartFooterDate={chartFooterDate}
            chartFooterDescription='XP Gained'
          />
        ) : (
          <div>Select a skill to get started.</div>
        )}
        <XpChartForm username={userData.name} />
      </div>
    </Container>
  );
};
export default ProfilePage;
