import Container from '@/components/layout/container';
import { ContentCard } from '../contentCard';

const Services = () => {
  return (
    <Container className='flex w-full flex-col items-center justify-evenly bg-gray-100 dark:bg-gray-900'>
      <h2 className='w-full text-center text-4xl font-bold capitalize outline-black'>
        Services
      </h2>
      <div className='flex w-full flex-col items-center justify-center gap-4 xl:flex-row'>
        <ContentCard title='Card 1'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
          sapiente. Nihil pariatur beatae iusto quasi ratione illum suscipit nam
          perferendis, eligendi iure atque facilis sapiente iste aut, repellat
          id animi!
        </ContentCard>
        <ContentCard title='Card 2'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
          eligendi veniam voluptate quibusdam asperiores possimus aliquid
          consequatur illo ipsum. Natus repellat animi modi doloribus autem
          similique enim commodi quam ratione.
        </ContentCard>
        <ContentCard title='Card 3'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Consequuntur, doloremque. Corrupti eveniet quidem atque odio minima
          expedita distinctio adipisci veniam aperiam natus recusandae, ipsum
          vero alias perferendis dicta hic. Animi.
        </ContentCard>
      </div>
    </Container>
  );
};
export default Services;
