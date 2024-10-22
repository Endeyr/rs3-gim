import Container from '@/components/layout/container';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <Container className='flex-col md:space-y-5'>
      <h2 className='w-full text-center text-xl font-bold capitalize'>
        Contact Us
      </h2>
      <div className='flex flex-col justify-evenly gap-4'>
        <div className='flex flex-col items-center justify-center gap-2'>
          {/* Contact Form */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nisi
            reiciendis illo omnis nihil atque sunt debitis veritatis ea fuga non
            esse sequi vel architecto optio, animi culpa ullam quae.
          </p>
          <h3 className='text-center font-bold'>Contact Form</h3>
          <div>form here</div>
        </div>
        <div>
          <h3 className='mb-4 w-full text-center text-lg font-bold capitalize'>
            Contact Us Today
          </h3>
          <div className='flex flex-col items-center justify-evenly'>
            <p className='flex w-full justify-between xl:w-1/4'>
              Phone: <span className='text-right'>555-555-5555</span>
            </p>
            <p className='flex w-full justify-between xl:w-1/4'>
              Email: <span className='text-right'>Email</span>
            </p>
            <div className='mt-2 flex w-full items-center justify-center gap-4 xl:w-1/4'>
              <Link href='#'>Social 1</Link>
              <Link href='#'>Social 2</Link>
              <Link href='#'>Social 3</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ContactPage;
