export interface ActivityI {
  date: string;
  details: string;
  text: string;
}

export interface SkillI {
  id: number;
  rank: number;
  level: number;
  xp: number;
  skillName: string;
}

export interface PlayerDataI {
  activities: ActivityI[];
  skillvalues: SkillI[];
  timestamp: Date;
  name: string;
  rank: string;
  melee: number;
  combatlevel: number;
  loggedIn: 'true' | 'false';
  totalxp: number;
  questsstarted: number;
  questscomplete: number;
  questsnotstarted: number;
  totalskill: number;
}
