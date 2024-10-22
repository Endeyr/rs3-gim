import Container from '@/components/layout/container';
import { ContentCard } from '../contentCard';

const Testimonials = () => {
  return (
    <Container className='flex w-full flex-col items-center justify-evenly bg-gray-100 dark:bg-gray-900'>
      <h2 className='w-full text-center text-4xl font-bold capitalize outline-black'>
        Testimonials
      </h2>
      <div className='flex w-full flex-col items-center justify-center gap-4 xl:flex-row'>
        <ContentCard title='Card 1' footer='- Name'>
          &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laudantium dolor a omnis consequatur voluptate placeat non vitae,
          eligendi similique unde tenetur nesciunt aperiam, quasi qui assumenda
          nam deleniti commodi laborum.&quot;
        </ContentCard>
        <ContentCard title='Card 2' footer='- Name'>
          &quot;Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi,
          maiores voluptatum rem debitis nam sed non ex tenetur quam laborum,
          quisquam nemo, aut quasi fuga laboriosam sit repudiandae? Nisi,
          ipsa.&quot;
        </ContentCard>
        <ContentCard title='Card 3' footer='- Name'>
          &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          veritatis libero, tenetur corrupti voluptas repudiandae aliquam
          maxime. Velit totam praesentium laborum cumque quia? Porro, atque
          magnam quas assumenda omnis veniam!&quot;
        </ContentCard>
        <ContentCard title='Card 4' footer='- Name'>
          &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. In iste
          aperiam illum, consequuntur commodi quae, porro quisquam, earum magni
          laborum numquam natus necessitatibus doloribus voluptate impedit
          similique accusamus labore maiores.&quot;
        </ContentCard>
      </div>
    </Container>
  );
};
export default Testimonials;
