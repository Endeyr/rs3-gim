'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { capitalizeFirstLetter, isPlayerOutOfDate } from '@/lib/utils';
import type { PlayerContextI } from '@/types/context';
import type { PlayerDataI } from '@/types/playerData';
import { RefreshCw, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { PlayerContext } from '../context/playerContext';

export interface XpTableI {
  playerData: PlayerDataI;
}

const XpTable: React.FC<XpTableI> = ({ playerData }) => {
  const { removePlayerData, updatePlayerData, removeMonthlyXpData } =
    useContext(PlayerContext) as PlayerContextI;
  const pathname = usePathname();

  const isOutOfDate = playerData ? isPlayerOutOfDate(playerData) : true;

  if (!playerData) {
    return null;
  }

  return (
    <>
      <div
        className='flex w-full items-center justify-center gap-2'
        role='group'
        aria-labelledby='player-actions'
      >
        {pathname !== `/profile/${encodeURIComponent(playerData.name)}` ? (
          <>
            <Link className='w-full' href={`profile/${playerData.name}`}>
              <Button
                className='w-full text-center'
                variant={'ghost'}
                aria-label={`Go to ${playerData.name}'s profile`}
              >
                {playerData.name}
              </Button>
            </Link>
            <Button
              size={'icon'}
              variant={'ghost'}
              onClick={() => {
                removePlayerData(playerData.name);
                removeMonthlyXpData(playerData.name);
              }}
              aria-label={`Remove ${playerData.name} from data`}
              aria-disabled={isOutOfDate ? 'true' : 'false'}
            >
              <Trash2 />
            </Button>
          </>
        ) : (
          <>
            <h2 id='player-actions'>{playerData.name}</h2>
            {isOutOfDate && (
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => updatePlayerData(playerData)}
                aria-label={`Refresh ${playerData.name}'s data`}
              >
                <RefreshCw />
              </Button>
            )}
          </>
        )}
      </div>
      <Table className='px-2 lg:text-[16px] xl:text-[12px]'>
        <TableCaption className='w-full'>
          Last Updated: {new Date(playerData.timestamp).toLocaleString()}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope='col'>Skill</TableHead>
            <TableHead scope='col' className='text-right'>
              Rank
            </TableHead>
            <TableHead scope='col' className='text-right'>
              Level
            </TableHead>
            <TableHead scope='col' className='text-right'>
              Experience
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playerData.skillvalues.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell>
                {capitalizeFirstLetter(skill.skillName || 'Unknown Skill')}
              </TableCell>
              <TableCell className='text-right'>
                {(skill.rank || 0).toLocaleString()}
              </TableCell>
              <TableCell className='text-right'>{skill.level || 0}</TableCell>
              <TableCell className='text-right'>
                {(skill.xp || 0).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Quest Completed</TableCell>
            <TableCell></TableCell>
            <TableCell className='text-right'>
              {playerData.questscomplete}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
export default XpTable;
