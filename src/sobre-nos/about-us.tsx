import PageContainer from '@/shared/page-container';
import { Menu } from '@/shared/menu';
import HomeAbout from '@/home/home-about';
import { Footer } from '@/shared/footer';
import AboutSection from '@/shared/about-section';
import ValuesSectionAbout from '@/shared/values-about';
import BrandsCarousel from '@/shared/brands-carousel';

export default function SobreNosPageComponent() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <PageContainer>
        <AboutSection hideExtras />
        <BrandsCarousel />
        <ValuesSectionAbout />
      </PageContainer>
      <Footer />
    </div>
  );
}
