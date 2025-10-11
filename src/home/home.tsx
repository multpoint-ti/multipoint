import { Menu } from '../shared/menu';
import { Carousel } from './carousel';
import HomeAbout from './home-about';

export default function HomePageComponent() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <div className='flex flex-col items-center w-full gap-10 md:gap-20'>
        <Carousel />
        <HomeAbout />
      </div>
    </div>
  );
}
