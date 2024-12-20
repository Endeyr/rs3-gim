'use client';

import XpChart from '@/app/components/xpChart';
import XpChartCheckbox from '@/app/components/xpChartCheckbox';
import XpTable from '@/app/components/xpTable';
import { PlayerContext } from '@/app/context/playerContext';
import Container from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import type { ChartConfig } from '@/components/ui/chart';
import { fetchSkillXp } from '@/lib/api/fetchSkillXp';
import { CHART_COLORS } from '@/lib/const';
import { isSkillXpOutOfDate } from '@/lib/utils';
import type { PlayerContextI } from '@/types/context';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import { Eye, RefreshCw } from 'lucide-react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

interface ProfilePagePropsI {
  params: { username: string };
}

const ProfilePage = ({ params }: ProfilePagePropsI) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isXpTableShown, setIsXpTableShown] = useState(true);

  const { username } = params;
  const { playerDataArray, monthlyXpDataArray, updateMonthlyXpData } =
    useContext(PlayerContext) as PlayerContextI;
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchXpData = async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();
      const signal = controllerRef.current.signal;

      const userXpData = monthlyXpDataArray.find(
        (player) => player.name === decodeURIComponent(username)
      );

      if (!userXpData) return;

      if (userXpData.monthlyXpGain.length <= 28) {
        await fetchSkillXp(
          decodeURIComponent(username),
          signal,
          updateMonthlyXpData
        );
      }
    };

    fetchXpData();

    return () => controllerRef.current?.abort();
  }, [username, monthlyXpDataArray, updateMonthlyXpData]);

  const {
    userData,
    userXpData,
    filteredXpData,
    chartConfig,
    chartDescription,
  } = useMemo(() => {
    // Find the user's data
    const userData = playerDataArray.find(
      (player) => player.name === decodeURIComponent(username)
    );

    const userXpData = monthlyXpDataArray.find(
      (player) => player.name === decodeURIComponent(username)
    );
    // User's data is undefined return
    if (!userXpData) {
      return {
        userData,
        userXpData,
        filteredXpData: [],
        chartConfig: {},
        chartDescription: '',
      };
    }

    // Add filter for chart
    const filteredXpData = userXpData.monthlyXpGain.filter((skill) =>
      selectedSkills.includes(skill.skillName)
    );

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
      userXpData,
      filteredXpData,
      chartConfig,
      chartDescription: `XP Gained by ${userXpData.name}`,
    };
  }, [playerDataArray, monthlyXpDataArray, username, selectedSkills]);

  const chartSize = isXpTableShown ? 'lg:col-span-2' : 'lg:col-span-3';

  const isOutOfDate = userXpData ? isSkillXpOutOfDate(userXpData) : true;

  return (
    <Container className='grid min-h-[100dvh] grid-cols-1 space-x-2 xl:grid-cols-3'>
      {userData && (
        <>
          {isXpTableShown && (
            <div className='col-span-1 w-full px-2'>
              <XpTable playerData={userData} />
            </div>
          )}
          <div
            className={`col-span-1 min-h-full w-[98%] items-start justify-center space-x-2 space-y-4 px-2 ${chartSize}`}
          >
            <div className='flex w-full items-center justify-evenly gap-2'>
              <Button
                size={'icon'}
                variant={'ghost'}
                className='w-full md:w-1/6'
                onClick={() => setIsXpTableShown(!isXpTableShown)}
                aria-label={`Remove ${userData.name} from data`}
                aria-disabled={isOutOfDate ? 'true' : 'false'}
              >
                {isXpTableShown ? <EyeClosedIcon /> : <Eye />}
              </Button>
              {isOutOfDate && (
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  className='w-full md:w-1/6'
                  aria-label={`Remove ${userData.name} from data`}
                  aria-disabled={isOutOfDate ? 'true' : 'false'}
                >
                  <RefreshCw />
                </Button>
              )}
              <div className='mx-2 flex w-full justify-end border border-red-500'>
                <XpChartCheckbox setSelectedSkills={setSelectedSkills} />
              </div>
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
