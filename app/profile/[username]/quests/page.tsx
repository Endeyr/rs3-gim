'use client';

import { PlayerContext } from '@/app/context/playerContext';
import Container from '@/components/layout/container';
import { PlayerContextI } from '@/types/context';
import { useContext, useMemo } from 'react';
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

  // TODO Filter based on quest stats or userEligible, sort based on quest points, difficulty, members, alphabetical a-z + z-a
  return (
    <Container className='flex-col'>
      <h2>Quests Page: {userData?.quests.length}</h2>
      <ul>
        {userData &&
          userData.quests.map((quest) => (
            <li key={quest.title}>{quest.title}</li>
          ))}
      </ul>
    </Container>
  );
};
export default QuestsPage;
