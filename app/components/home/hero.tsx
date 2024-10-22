import Container from '@/components/layout/container';
import { Button } from '@/components/ui/button';

const Hero = () => {
  // TODO add background image, replace bg-gray-600 w/ bg-no-repeat bg-cover bg-center, add style={{ backgroundImage: 'url(' + heroBg.src + ')' }}
  return (
    <Container
      className='flex flex-col items-center bg-gray-400 dark:bg-gray-600 dark:text-white xl:items-start xl:justify-start'
      id='hero-section'
    >
      <div className='flex h-full w-full flex-col items-start justify-between gap-4 xl:w-1/2'>
        <h2 className='my-4 w-full text-center text-4xl font-bold capitalize outline-black'>
          Title - Hero
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus qui
          nisi saepe? Rem beatae aut illum a nulla laborum hic recusandae
          corporis. Voluptatum odio debitis quia perferendis, natus dolores
          delectus?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus qui
          nisi saepe? Rem beatae aut illum a nulla laborum hic recusandae
          corporis. Voluptatum odio debitis quia perferendis, natus dolores
          delectus?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus qui
          nisi saepe? Rem beatae aut illum a nulla laborum hic recusandae
          corporis. Voluptatum odio debitis quia perferendis, natus dolores
          delectus?
        </p>
        <Button>Do Something</Button>
      </div>
    </Container>
  );
};
export default Hero;
