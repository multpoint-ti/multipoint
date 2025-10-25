import PageContainer from '@/shared/page-container';
import { Menu } from '../shared/menu';
import { Carousel } from './carousel';
import HomeAbout from './home-about';
import { Footer } from '@/shared/footer';
import Address from './address';
import Contact from './contact';
import ProductsLineCarousel from './products-line-carousel';

export default function HomePageComponent() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <Carousel />
      <ProductsLineCarousel />
      <PageContainer>
        <HomeAbout />
      </PageContainer>
      <Contact />
      <span className='py-6 md:py-0'></span>
      <PageContainer>
        <Address />
      </PageContainer>
      <Footer />
    </div>
  );
}
