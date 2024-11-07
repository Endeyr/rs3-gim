'use client';

import { PlayerContext } from '@/app/context/playerContext';
import Container from '@/components/layout/container';
import { PlayerContextI } from '@/types/context';
import { useContext, useMemo } from 'react';
import QuestsList from './questsList';
interface QuestsPagePropsI {
  params: { username: string };
}
const QuestsPage = ({ params }: QuestsPagePropsI) => {
  const { username } = params;
  const { playerDataArray } = useContext(PlayerContext) as PlayerContextI;

  const { userData } = useMemo(() => {
    const userData = playerDataArray.find(
      (player) => player.name === decodeURIComponent(username)
    );

    return {
      userData,
    };
  }, [playerDataArray, username]);

  return (
    <Container className='flex-col space-y-6 md:space-y-6'>
      <h2>{userData?.name}</h2>
      {userData?.quests ? (
        <QuestsList quests={userData.quests} />
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};
export default QuestsPage;
