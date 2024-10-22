import Container from '@/components/layout/container';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <Container className='flex-col justify-start'>
      <h2 className='w-full text-center text-xl font-bold capitalize'>
        About Us
      </h2>
      <div className='items-start justify-center gap-4 xl:grid xl:grid-cols-2'>
        <div className='mt-2 hidden xl:block'>Image</div>
        <div className='flex flex-col items-start justify-start gap-2'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            doloribus officiis ipsam nesciunt natus quis, possimus quibusdam
            sed, nemo quod nisi, perspiciatis molestiae numquam fuga facilis ex
            quia ducimus dicta!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi
            inventore placeat at quos cupiditate! Non accusamus reprehenderit
            dolores voluptas sequi possimus temporibus molestias delectus,
            dolorem explicabo mollitia sint nam beatae!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            magni reiciendis vero fugiat illo. Earum odit culpa sed, facere sint
            alias cum a nesciunt id officia recusandae, illum illo laudantium.
          </p>
          <p>
            <Link className='text-blue-500' href='#'>
              Click Me
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};
export default AboutPage;
