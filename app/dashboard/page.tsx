'use client';

import Container from '@/components/layout/container';
import { PlayerContextI } from '@/types/context';
import { PlayerDataI } from '@/types/playerData';
import { useContext, useEffect } from 'react';
import MessageStatus from '../components/messageStatus';
import SearchBar from '../components/searchBar';
import XpTable from '../components/xpTable';
import { PlayerContext } from '../context/playerContext';

const Dashboard = () => {
  const { playerDataArray, updatePlayerDataArray, message } = useContext(
    PlayerContext
  ) as PlayerContextI;

  useEffect(() => {
    const savedPlayerDataArray = localStorage.getItem('playerDataArray');
    if (savedPlayerDataArray) {
      try {
        const playerDataArray = JSON.parse(
          savedPlayerDataArray
        ) as PlayerDataI[];
        updatePlayerDataArray(playerDataArray);
      } catch (error) {
        console.error(
          `Failed to parse player data from localStorage: ${error}`
        );
      }
    }
  }, [updatePlayerDataArray]);

  const dynamicClasses =
    playerDataArray.length >= 5
      ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
      : playerDataArray.length < 5 && playerDataArray.length >= 3
        ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : playerDataArray.length === 2
          ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
          : playerDataArray.length === 1
            ? 'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
            : 'md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1';

  return (
    <Container className='flex flex-col'>
      {message && <MessageStatus />}
      <ul className={`grid grid-cols-1 gap-4 ${dynamicClasses}`}>
        {playerDataArray.length === 0 ? (
          <li>No players found. Please add some players.</li>
        ) : (
          playerDataArray.map((playerData) => (
            <li key={playerData.name} className='w-full'>
              <XpTable playerData={playerData} />
            </li>
          ))
        )}
        <li className='col-span-1 flex w-full flex-col items-center justify-start gap-2'>
          <SearchBar />
        </li>
      </ul>
    </Container>
  );
};

export default Dashboard;
