import type { PlayerDataI } from '@/types/playerData';
import type { MonthlyXpGainI, MonthlyXpI } from '@/types/xpData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MAX_AGE, MAX_AGE_MONTH } from './const';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isPlayerOutOfDate = (playerData: PlayerDataI): boolean => {
  const timeDifference = Date.now() - new Date(playerData.timestamp).getTime();

  return timeDifference > MAX_AGE;
};

export const isSkillXpOutOfDate = (existingSkillData: MonthlyXpI): boolean => {
  const timeDifference =
    Date.now() - new Date(existingSkillData.timestamp).getTime();
  return timeDifference > MAX_AGE_MONTH;
};

export interface FormattedChartDataI {
  skillName: string;
}

export const formatChartData = (
  chartData: MonthlyXpGainI[]
): FormattedChartDataI[] => {
  const formattedChartData: FormattedChartDataI[] = [];
  chartData.map((data) => {
    const newObj = {
      ...data,
    };
    formattedChartData.push(newObj);
  });

  return formattedChartData;
};
