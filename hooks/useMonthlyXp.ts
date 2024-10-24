import { MonthlyXpI } from '@/types/xpData';
import useSWR from 'swr';

interface useMonthlyXpI {
  name: string;
  skillId: number;
}

const useMonthlyXp = ({ name, skillId }: useMonthlyXpI) => {
  const url = `/api/runemetrics/getMonthlyXp?name=${encodeURIComponent(
    name
  )}&skillId=${encodeURIComponent(skillId)}`;
  const { data, error, isValidating } = useSWR<MonthlyXpI>(url);

  return {
    monthlyXpData: data,
    isValidatingMonthlyXpData: isValidating,
    isMonthlyXpDataError: error,
  };
};

export default useMonthlyXp;
