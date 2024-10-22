import CallToAction from './components/home/call-to-action';
import Hero from './components/home/hero';
import Identity from './components/home/identity';
import Services from './components/home/services';
import Testimonials from './components/home/testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Identity />
      <Testimonials />
      <CallToAction />
    </>
  );
}
