import { SKILL_IDS } from '@/lib/const';
import { MonthlyXpI } from '@/types/xpData';
import axios from 'axios';

export const fetchSkillXp = async (
  username: string,
  signal: AbortSignal,
  updateMonthlyXpData: (newMonthlyXpData: MonthlyXpI) => void
) => {
  try {
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
      } else if (response.status === 'rejected') {
        if (signal.aborted) {
          console.log('Request Aborted');
        } else if (axios.isAxiosError(response.reason)) {
          console.error('Request failed:', response.reason.message);
        } else {
          console.error('Unexpected error:', response.reason);
        }
      }
    });
  } catch (error) {
    console.error('Error fetching skill XP:', error);
  }
};
