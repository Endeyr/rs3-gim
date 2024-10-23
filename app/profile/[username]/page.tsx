'use client';

import XpChart from '@/app/components/xpChart';
import XpChartCheckbox from '@/app/components/xpChartCheckbox';
import XpTable from '@/app/components/xpTable';
import { PlayerContext } from '@/app/context/playerContext';
import Container from '@/components/layout/container';
import type { ChartConfig } from '@/components/ui/chart';
import { CHART_COLORS, MONTH_NAMES } from '@/lib/const';
import type { PlayerContextI } from '@/types/context';
import { useContext, useMemo, useState } from 'react';

interface ProfilePagePropsI {
  params: { username: string };
}

const ProfilePage = ({ params }: ProfilePagePropsI) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { username } = params;
  const { playerDataArray, monthlyXpDataArray } = useContext(
    PlayerContext
  ) as PlayerContextI;

  const {
    userData,
    filteredXpData,
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
        filteredXpData: [],
        chartConfig: {},
        chartDescription: '',
        chartFooterDate: '',
      };
    }
    const filteredXpData = userXpData.monthlyXpGain.filter((skill) =>
      selectedSkills.includes(skill.skillName)
    );

    const monthDates = filteredXpData
      .flatMap((skill) => skill.monthData)
      .map((month) => new Date(month.timestamp))
      .sort((a, b) => a.getTime() - b.getTime());

    const firstMonth = monthDates[0];
    const lastMonth = monthDates[monthDates.length - 1];

    const chartConfig: ChartConfig = filteredXpData.reduce(
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
      filteredXpData,
      chartConfig,
      chartDescription: `XP Gained by ${userXpData.name}`,
      chartFooterDate:
        firstMonth && lastMonth
          ? `${MONTH_NAMES[firstMonth.getMonth()]} - ${
              MONTH_NAMES[lastMonth.getMonth()]
            }`
          : '',
    };
  }, [playerDataArray, monthlyXpDataArray, username, selectedSkills]);

  if (!userData) return <div>PlayerData not found</div>;

  return (
    <Container className='grid grid-cols-1 space-x-2 lg:grid-cols-3'>
      <div className='col-span-1 px-2'>
        <XpTable playerData={userData} />
      </div>
      <div className='col-span-1 h-full w-[98%] items-start justify-center space-x-2 space-y-4 px-2 lg:col-span-2'>
        <div className='mx-2 flex w-full justify-start'>
          <XpChartCheckbox setSelectedSkills={setSelectedSkills} />
        </div>
        {filteredXpData.length > 0 ? (
          <XpChart
            chartData={filteredXpData}
            chartConfig={chartConfig}
            chartDescription={chartDescription}
            chartTitle={`Xp for ${userData.name}`}
            chartFooterDate={chartFooterDate}
            chartFooterDescription='XP Gained'
          />
        ) : (
          <div>Select a skill to get started.</div>
        )}
      </div>
    </Container>
  );
};
export default ProfilePage;
