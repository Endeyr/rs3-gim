import Link from 'next/link';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 hidden w-full border-b bg-white dark:bg-black md:block'>
      <div className='flex h-16 items-center p-[50px]'>
        <div className='mx-auto w-full space-y-20'>
          <div className='flex justify-between'>
            {/* Left Side Container */}
            <div className='flex items-center justify-start gap-4'>
              <Link
                href='/'
                className='inline-flex h-10 items-center justify-center text-lg font-bold text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
              >
                Home
              </Link>
            </div>
            {/* Right Side Container */}
            <div className='flex items-center justify-end'>
              <nav className='flex items-center gap-4 space-x-1'>
                <Link
                  href='/services'
                  className='rm-text-shadow h-10 w-full p-2 text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
                >
                  Services
                </Link>
                <Link
                  href='/about'
                  className='rm-text-shadow h-10 w-full p-2 text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
                >
                  About
                </Link>
                <Link
                  href='/contact'
                  className='rm-text-shadow h-10 w-full p-2 text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
                >
                  Contact
                </Link>
                <Link
                  href='/dashboard'
                  className='rm-text-shadow h-10 w-full p-2 text-gray-800 hover:text-[#4078c8] dark:text-white dark:hover:text-[#4078c8]'
                >
                  Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
