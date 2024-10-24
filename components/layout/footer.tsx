import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='hidden w-full gap-3 bg-white p-[50px] text-gray-800 dark:bg-black dark:text-white sm:grid sm:grid-cols-4 sm:items-center sm:justify-between'>
      <div className='flex h-full w-full flex-col items-start justify-start gap-2'>
        <h2 className='text-xl font-bold capitalize'>Title</h2>
        <p className='w-1/2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className='flex h-full w-full flex-col items-start justify-start gap-2'>
        <h2 className='text-xl font-bold capitalize'>Browse</h2>
        <ul className='flex flex-col' role='list'>
          <li>
            <Link
              href='/'
              className='w-full text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/dashboard'
              className='w-full text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href='/services'
              className='w-full text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href='/about'
              className='w-full text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href='/contact'
              className='w-full text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex h-full w-full flex-col items-start justify-start gap-2'>
        <h2 className='text-xl font-bold capitalize'>Services</h2>
        <ul className='flex flex-col' role='list'>
          <li>Service 1</li>
          <li>Service 2</li>
          <li>Service 3</li>
          <li>Service 4</li>
        </ul>
      </div>
      <div className='flex h-full w-full flex-col items-start justify-start gap-2'>
        <h2 className='text-xl font-bold capitalize'>Contact</h2>
        <ul className='flex flex-col' role='list'>
          <li className='flex items-center justify-start gap-2'>
            <span>Location</span>
          </li>
          <li className='flex items-center justify-start gap-2'>
            <span>Email</span>
          </li>
          <li className='flex items-center justify-start gap-2'>
            <span>555-555-5555</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
