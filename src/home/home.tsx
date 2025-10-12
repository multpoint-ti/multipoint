import PageContainer from '@/shared/page-container';
import { Menu } from '../shared/menu';
import { Carousel } from './carousel';
import HomeAbout from './home-about';
import { Footer } from '@/shared/footer';

export default function HomePageComponent() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <Carousel />
      <PageContainer>
        <HomeAbout />
      </PageContainer>
      <Footer />
    </div>
  );
}
