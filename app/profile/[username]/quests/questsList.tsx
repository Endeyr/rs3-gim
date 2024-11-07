'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QuestI, RuneScapeQuestStatus } from '@/types/playerData';
import { useState } from 'react';
import QuestCard from './questCard';

interface QuestListPropsI {
  quests: QuestI[];
}

export enum QuestFilters {
  difficulty = 'difficulty',
  members = 'members',
  questPoints = 'questPoints',
  title = 'title',
  userEligible = 'userEligible',
  status = 'status',
}

export const STATUS_OPTIONS: (RuneScapeQuestStatus | 'ALL')[] = [
  'ALL',
  'NOT_STARTED',
  'STARTED',
  'COMPLETED',
];

const QuestsList = ({ quests }: QuestListPropsI) => {
  const [filteredQuests, setFilteredQuests] = useState<QuestI[]>(quests);
  const [isAsc, setIsAsc] = useState(true);

  const handleStatusChange = (status: RuneScapeQuestStatus | 'ALL') => {
    handleFilteredData(QuestFilters.status, status);
  };

  const handleFilteredData = (
    criteria: QuestFilters | 'ALL',
    nextStatus?: RuneScapeQuestStatus | 'ALL'
  ) => {
    const newQuests = quests?.filter((quest) => {
      switch (criteria) {
        case QuestFilters.members:
          return quest.members;
        case QuestFilters.status:
          return nextStatus === 'ALL' ? quests : quest.status === nextStatus;
        case QuestFilters.userEligible:
          return quest.userEligible;
        case 'ALL':
          return quests;
        default:
          return true;
      }
    });
    setFilteredQuests(newQuests);
  };

  const handleToggleDirection = (value: string) => {
    if (value === 'ASC') {
      setIsAsc(true);
    } else {
      setIsAsc(false);
    }
  };

  const handleSortQuests = (criteria: QuestFilters) => {
    const sortedQuests = [...filteredQuests].sort((a, b) => {
      if (criteria === QuestFilters.difficulty) {
        return isAsc
          ? a.difficulty - b.difficulty
          : b.difficulty - a.difficulty;
      } else if (criteria === QuestFilters.questPoints) {
        return isAsc
          ? a.questPoints - b.questPoints
          : b.questPoints - a.questPoints;
      } else if (criteria === QuestFilters.title) {
        return isAsc
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        return 0;
      }
    });
    setFilteredQuests(sortedQuests);
  };

  return (
    <div className='min-h-[100dvh] w-full space-y-4'>
      <div>Quests Shown: {filteredQuests.length}</div>
      <div className='flex items-center justify-evenly'>
        <Select onValueChange={(value: string) => handleToggleDirection(value)}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Direction' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'ASC'}>Asc</SelectItem>
            <SelectItem value={'DESC'}>Desc</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: QuestFilters) => handleFilteredData(value)}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'All'}>All</SelectItem>
            <SelectItem value={QuestFilters.members}>Members</SelectItem>
            <SelectItem value={QuestFilters.userEligible}>
              User Eligible
            </SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select Status' />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {status === 'ALL' ? 'All' : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleSortQuests}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Sort By' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={QuestFilters.difficulty}>Difficulty</SelectItem>
            <SelectItem value={QuestFilters.title}>Title</SelectItem>
            <SelectItem value={QuestFilters.questPoints}>
              Quest Points
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul className='space-y-2'>
        {filteredQuests.length > 0 &&
          filteredQuests.map((quest) => (
            <QuestCard key={quest.title} quest={quest} />
          ))}
      </ul>
    </div>
  );
};
export default QuestsList;
