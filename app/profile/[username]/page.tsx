'use client';

import XpChart from '@/app/components/xpChart';
import XpChartCheckbox from '@/app/components/xpChartCheckbox';
import XpTable from '@/app/components/xpTable';
import { PlayerContext } from '@/app/context/playerContext';
import Container from '@/components/layout/container';
import type { ChartConfig } from '@/components/ui/chart';
import { CHART_COLORS } from '@/lib/const';
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

  const { userData, filteredXpData, chartConfig, chartDescription } =
    useMemo(() => {
      const userData = playerDataArray.find(
        (player) => player.name === decodeURIComponent(username)
      );

      const userXpData = monthlyXpDataArray.find(
        (player) => player.name === decodeURIComponent(username)
      );

      if (!userXpData) {
        return {
          userData,
          filteredXpData: [],
          chartConfig: {},
          chartDescription: '',
        };
      }
      const filteredXpData = userXpData.monthlyXpGain.filter((skill) =>
        selectedSkills.includes(skill.skillName)
      );

      const chartConfig: ChartConfig = filteredXpData.reduce(
        (acc, skill, index) => {
          acc[skill.skillName] = {
            label:
              skill.skillName.charAt(0).toUpperCase() +
              skill.skillName.slice(1),
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
      };
    }, [playerDataArray, monthlyXpDataArray, username, selectedSkills]);

  return (
    <Container className='grid grid-cols-1 space-x-2 xl:grid-cols-3'>
      {userData && (
        <>
          <div className='col-span-1 w-full px-2'>
            <XpTable playerData={userData} />
          </div>
          <div className='col-span-1 h-full w-[98%] items-start justify-center space-x-2 space-y-4 px-2 lg:col-span-2'>
            <div className='mx-2 flex w-full justify-start'>
              <XpChartCheckbox setSelectedSkills={setSelectedSkills} />
            </div>
            {filteredXpData.length > 0 && (
              <XpChart
                chartData={filteredXpData}
                chartConfig={chartConfig}
                chartDescription={chartDescription}
                chartTitle={`Xp for ${userData.name}`}
                chartFooterDescription='XP Gained'
              />
            )}
          </div>
        </>
      )}
    </Container>
  );
};
export default ProfilePage;
