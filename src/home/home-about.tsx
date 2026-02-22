import AboutSection from '@/shared/about-section';
import HomeAboutImage from '../../public/imgs/two-worker-making-gates-smithy.jpg';

const HomeAbout = () => {
    return (
        <section className="max-w-7xl flex flex-col items-center gap-8 lg:gap-20 py-8">
            <h1 className="text-3xl md:text-5xl font-medium text-center max-w-4xl md:pb-12 leading-tight">
                <strong className=''>Referência nacional</strong> em válvulas injetoras para reposição automotiva
            </h1>
            <AboutSection
                image={HomeAboutImage}
                imageAlt="Quem Somos"
                tagName="Quem somos"
                title={<>Somos uma empresa <span className="font-bold">100% brasileira</span></>}
                description="A MultPoint é uma empresa 100% brasileira, especializada na fabricação de válvulas injetoras para o mercado de reposição automotiva. Sediada em Registro – SP, destaca-se pela robustez de seus produtos, com performance equiparada à original, e pelo compromisso com a qualidade e inovação."
            />
        </section>
    );
};

export default HomeAbout;
