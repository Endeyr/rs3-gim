import Container from '@/components/layout/container';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <Container className='flex-col bg-white dark:bg-black'>
      <h2 className='w-full text-center text-4xl font-bold capitalize outline-black'>
        Title - Call to Action
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
        tenetur veniam blanditiis repudiandae nulla aperiam rem dignissimos
        atque laudantium a dicta autem fugit, amet reiciendis cum adipisci nemo
        placeat modi.
      </p>
      <Button>Click Me</Button>
    </Container>
  );
};
export default CallToAction;
