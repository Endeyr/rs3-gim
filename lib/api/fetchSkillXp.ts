import { SKILL_IDS } from '@/lib/const';
import { MonthlyXpI } from '@/types/xpData';
import axios from 'axios';

export const fetchSkillXp = async (
  username: string,
  signal: AbortSignal,
  updateMonthlyXpData: (newMonthlyXpData: MonthlyXpI) => void
) => {
  const skillXpRequests = SKILL_IDS.map((skillId) =>
    axios<MonthlyXpI>(
      `/api/runemetrics/getMonthlyXp?name=${encodeURIComponent(
        username
      )}&skillId=${encodeURIComponent(skillId)}`,
      { timeout: 60000, signal }
    )
  );

  const responses = await Promise.allSettled(skillXpRequests);

  responses.forEach((response) => {
    if (response.status === 'fulfilled' && response.value.status === 200) {
      updateMonthlyXpData(response.value.data);
    } else {
      if (signal.aborted) {
        throw new Error('Request aborted');
      }
    }
  });
};
