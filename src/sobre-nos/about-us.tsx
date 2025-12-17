import PageContainer from '@/shared/page-container';
import { Menu } from '@/shared/menu';
import HomeAbout from '@/home/home-about';
import { Footer } from '@/shared/footer';
import AboutSection from '@/shared/about-section';
import ValuesSectionAbout from '@/shared/values-about';

export default function SobreNosPageComponent() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <PageContainer>
        <AboutSection hideExtras />
        <ValuesSectionAbout />
      </PageContainer>
      <Footer />
    </div>
  );
}
