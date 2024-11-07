import { QuestI } from '@/types/playerData';

interface QuestCardPropsI {
  quest: QuestI;
}

const QuestCard = ({ quest }: QuestCardPropsI) => {
  return (
    <li className='grid grid-cols-5 items-center' key={quest.title}>
      <p className='col-span-2'>Title: {quest.title}</p>
      <p>Quest Points: {quest.questPoints}</p>
      <p>Difficulty: {quest.difficulty}</p>
      <p>Members: {quest.members ? 'Yes' : 'No'}</p>
    </li>
  );
};
export default QuestCard;
