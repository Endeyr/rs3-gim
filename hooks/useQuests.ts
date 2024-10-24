import { Quests } from '@/types/api';
import useSWR from 'swr';

interface useQuestsI {
  name: string;
}

const useQuests = ({ name }: useQuestsI) => {
  const url = `/api/runemetrics/getQuest?name=${encodeURIComponent(name)}`;
  const { data, error, isValidating } = useSWR<Quests>(url);

  return {
    questsData: data,
    isValidatingQuestsData: isValidating,
    isQuestsDataError: error,
  };
};

export default useQuests;
