import type {
  MonthlyExperience,
  MonthlyExperienceGain,
  Profile,
  ProfileSkills,
  Quests,
} from '@/types/api';
import axios from 'axios';
import { runemetrics } from './../const';

const skillsMap = new Map(Object.entries(runemetrics.skills));

export const getProfileData = async (name: string): Promise<Profile | null> => {
  try {
    const url = `${runemetrics.endpoints['profile']}?user=${encodeURIComponent(
      name
    )}&activities=5`;
    const response = await axios.get<Profile>(url, { timeout: 60000 });
    const data = response.data;
    if (!data || typeof data === 'string') {
      throw new Error('API response data is invalid or undefined');
    }
    data.timestamp = new Date();
    data.skillvalues.forEach((skill: ProfileSkills) => {
      const skillName = skillsMap.get(String(skill.id));
      if (!skillName) {
        skill.skillName = 'unknown';
      } else {
        skill.skillName = skillName;
      }
      // API sends extra integer at end bc xp is determined to the tenth
      skill.xp = Math.floor(skill.xp / 10);
    });
    return data as Profile;
  } catch (error: unknown) {
    handleError(error, 'getProfileData');
    return null;
  }
};

export const getQuestData = async (name: string): Promise<Quests | null> => {
  try {
    const url = `${runemetrics.endpoints['quests']}?user=${encodeURIComponent(
      name
    )}`;
    const response = await axios.get<Quests>(url, { timeout: 60000 });
    const data = response.data;
    if (!data || typeof data === 'string') {
      throw new Error('API response data is invalid or undefined');
    }
    data.timestamp = new Date();
    data.name = name;
    return data as Quests;
  } catch (error: unknown) {
    handleError(error, 'getQuestData');
    return null;
  }
};

export const getMonthlyXpData = async (
  name: string,
  skillId: number
): Promise<MonthlyExperience | null> => {
  try {
    const parsedName = name.replace(/ /g, '_');
    const url = `${
      runemetrics.endpoints['monthlyXp']
    }?searchName=${parsedName}&skillid=${skillId}`;
    const response = await axios.get<MonthlyExperience>(url, {
      timeout: 60000,
    });
    const data = response.data;
    if (!data || typeof data === 'string') {
      throw new Error('API response data is invalid or undefined');
    }
    data.name = name;
    data.monthlyXpGain.forEach((xpGain: MonthlyExperienceGain) => {
      const skillName = skillsMap.get(String(xpGain.skillId));
      xpGain.timestamp = new Date();
      xpGain.skillName = skillName || 'unknown';
      if (xpGain.monthData.length === 0) {
        for (let i = 0; i < 13; i++) {
          xpGain.monthData.push({
            xpGain: 0,
            rank: 0,
          });
        }
      }
    });
    return data as MonthlyExperience;
  } catch (error: unknown) {
    handleError(error, 'getMonthlyXpData');
    return null;
  }
};

const handleError = (error: unknown, functionName: string) => {
  if (axios.isAxiosError(error)) {
    throw new Error(`${functionName} error: ${error.message}`);
  } else if (error instanceof Error) {
    throw new Error(`${functionName} error: ${error.message}`);
  } else {
    throw new Error(`${functionName} error: an unknown error occurred`);
  }
};
