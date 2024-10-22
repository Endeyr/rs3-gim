import Container from '@/components/layout/container';
import Service from './service';

const ServicesPage = () => {
  return (
    <Container className='flex-col justify-start gap-2'>
      <h2 className='w-full text-center text-xl font-bold capitalize'>
        Our Services
      </h2>
      {/* Content */}
      <div className='grid-col-3 grid min-h-60 w-full bg-gray-300 dark:bg-gray-700'>
        <Service
          title='title'
          paragraph=' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellat aliquam? Natus nobis illo qui quod sapiente, sed dolorem, nihil dolorum in, delectus corrupti possimus earum est cum pariatur sint!'
          imgSide='left'
        />
      </div>
      <div className='grid-col-3 grid min-h-60 w-full bg-gray-200 dark:bg-gray-800'>
        <Service
          title='title'
          paragraph=' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellat aliquam? Natus nobis illo qui quod sapiente, sed dolorem, nihil dolorum in, delectus corrupti possimus earum est cum pariatur sint!'
          imgSide='right'
        />
      </div>
      <div className='grid-col-3 grid min-h-60 w-full bg-gray-300 dark:bg-gray-700'>
        <Service
          title='title'
          paragraph=' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellat aliquam? Natus nobis illo qui quod sapiente, sed dolorem, nihil dolorum in, delectus corrupti possimus earum est cum pariatur sint!'
          imgSide='left'
        />
      </div>
      <div className='grid-col-3 grid min-h-60 w-full bg-gray-200 dark:bg-gray-800'>
        <Service
          title='title'
          paragraph=' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellat aliquam? Natus nobis illo qui quod sapiente, sed dolorem, nihil dolorum in, delectus corrupti possimus earum est cum pariatur sint!'
          imgSide='right'
        />
      </div>
      <div className='grid-col-3 grid min-h-60 w-full bg-gray-300 dark:bg-gray-700'>
        <Service
          title='title'
          paragraph=' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellat aliquam? Natus nobis illo qui quod sapiente, sed dolorem, nihil dolorum in, delectus corrupti possimus earum est cum pariatur sint!'
          imgSide='left'
        />
      </div>
      <div className='grid-col-3 grid min-h-60 w-full bg-gray-200 dark:bg-gray-800'>
        <Service
          title='title'
          paragraph=' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellat aliquam? Natus nobis illo qui quod sapiente, sed dolorem, nihil dolorum in, delectus corrupti possimus earum est cum pariatur sint!'
          imgSide='right'
        />
      </div>
      <div className='grid-col-3 grid min-h-60 w-full bg-gray-300 dark:bg-gray-700'>
        <Service
          title='title'
          paragraph=' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellat aliquam? Natus nobis illo qui quod sapiente, sed dolorem, nihil dolorum in, delectus corrupti possimus earum est cum pariatur sint!'
          imgSide='left'
        />
      </div>
      <div className='grid-col-3 grid min-h-60 w-full bg-gray-200 dark:bg-gray-800'>
        <Service
          title='title'
          paragraph=' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellat aliquam? Natus nobis illo qui quod sapiente, sed dolorem, nihil dolorum in, delectus corrupti possimus earum est cum pariatur sint!'
          imgSide='right'
        />
      </div>
    </Container>
  );
};
export default ServicesPage;
