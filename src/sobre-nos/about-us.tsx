import PageContainer from '@/shared/page-container';
import { Menu } from '@/shared/menu';
import { Footer } from '@/shared/footer';
import AboutSection from '@/shared/about-section';
import ValuesSectionAbout from '@/shared/values-about';
import BrandsCarousel from '@/shared/brands-carousel';
import HomeAboutImage from '../../public/imgs/two-worker-making-gates-smithy.jpg';
import HomeAboutImage2 from '../../public/imgs/mechanic-servicing-car.jpg';
import HomeAboutImage3 from '../../public/imgs/radiador.webp';

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
          description="A MultPoint Indústria é uma empresa 100% brasileira, referência nacional na fabricação de válvulas injetoras para o mercado de reposição automotiva. Com raízes no recondicionamento artesanal em São Paulo, construímos uma trajetória marcada pela evolução constante, impulsionada por investimentos em tecnologia, qualidade e inovação. Sediada em Registro – SP, a MultPoint se destaca pela robustez de seus produtos, com performance equiparada à original."
          hideExtras
        />
        <BrandsCarousel />
        <AboutSection
          image={HomeAboutImage2}
          imageAlt="Nossa Missão"
          tagName="Nossa Missão"
          title={<><span className="text-blue-ignition font-bold">Dedicação</span> em primeiro lugar</>}
          description="Nossa missão é fornecer válvulas injetoras que atendam às mais rigorosas normas de segurança e eficiência. Trabalhamos com profissionais qualificados, ferramentas de alta precisão e investimos continuamente em novas tecnologias, mantendo o compromisso com a excelência em cada produto."
          hideExtras
          variant="right"
        />
        <ValuesSectionAbout />
        <AboutSection
          image={HomeAboutImage3}
          imageAlt="Nossa Visão"
          tagName="Nossa Visão"
          title={<><span className="text-blue-ignition font-bold">Qualidade</span> e <span className="text-blue-ignition font-bold">crescimento</span> andam juntos</>}
          description="Queremos nos tornar a maior empresa da América Latina no ramo de fornecimento de válvulas injetoras, prezando sempre pela qualidade dos nossos produtos e do nosso atendimento. Até porquê, qualidade e crescimento andam juntos!"
          hideExtras
        />
      </PageContainer>
      <Footer />
    </div>
  );
}
