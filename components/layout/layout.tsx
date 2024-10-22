import Footer from './footer';
import Navbar from './navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-[100dvh]'>
      <Navbar />
      <main className='flex min-h-[90dvh] w-full flex-col items-center justify-center'>
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
