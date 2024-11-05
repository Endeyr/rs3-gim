export interface MonthDataI {
  rank: number;
  timestamp: number;
  xpGain: number;
}

export interface MonthlyXpGainI {
  averageXpGain: number;
  monthData: MonthDataI[];
  skillId: number;
  skillName: string;
  totalGain: number;
  totalXp: number;
}

export interface MonthlyXpI {
  monthlyXpGain: MonthlyXpGainI[];
  loggedIn: 'false' | 'true';
  name: string;
  timestamp: Date;
}
