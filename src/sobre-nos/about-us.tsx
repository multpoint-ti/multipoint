import PageContainer from '@/shared/page-container';
import { Menu } from '@/shared/menu';
import { Footer } from '@/shared/footer';
import AboutSection from '@/shared/about-section';
import ValuesSectionAbout from '@/shared/values-about';
import BrandsCarousel from '@/shared/brands-carousel';
import HomeAboutImage from '../../public/imgs/man-with-a-car.png';

export default function SobreNosPageComponent() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <PageContainer>
        <AboutSection
          image={HomeAboutImage}
          imageAlt="Quem Somos"
          tagName="Quem somos"
          title={<>Somos uma empresa <span className="text-blue-ignition font-bold">100% brasileira</span></>}
          description="A MultPoint é uma empresa especializada na fabricação de Válvulas Injetoras. Localizada no município de Registro – SP á 190 Km da Capital, a MultPoint é uma empresa 100% brasileira."
          hideExtras
        />
        <BrandsCarousel />
        <ValuesSectionAbout />
        <span></span>
        <AboutSection
          image={HomeAboutImage}
          imageAlt="Nossa Missão"
          tagName="Nossa Missão"
          title={<><span className="text-blue-ignition font-bold">Dedicação</span> em primeiro lugar</>}
          description="Nossa missão é entregar as peças de maior qualidade para o nosso cliente, tendo comprometimento com excelência."
          hideExtras
        />
        <AboutSection
          image={HomeAboutImage}
          imageAlt="Nossa Visão"
          tagName="Nossa Visão"
          title={<><span className="text-blue-ignition font-bold">Qualidade</span> e <span className="text-blue-ignition font-bold">crescimento</span> andam juntos</>}
          description="Queremos nos tornar a maior empresa da América Latina no ramo de fornecimento de válvulas injetoras, prezando sempre pela qualidade dos nossos produtos e do nosso atendimento. Até porquê, qualidade e crescimento andam juntos!"
          variant="right"
          hideExtras
        />
      </PageContainer>
      <Footer />
    </div>
  );
}
