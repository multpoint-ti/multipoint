import ValueAbout from '@/shared/values-about';
import AboutSection from '@/shared/about-section';
import HomeAboutImage from '../../public/imgs/man-with-a-car.png';

const HomeAbout = () => {
    return (
        <section className="max-w-7xl flex flex-col items-center gap-20">
            <h1 className="text-3xl md:text-5xl font-medium text-center max-w-3xl leading-tight">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </h1>
            <AboutSection
                image={HomeAboutImage}
                imageAlt="Quem Somos"
                tagName="Quem somos"
                title={<>Somos uma empresa <span className="text-blue-gravel-mist font-bold">100% brasileira</span></>}
                description="A MULT POINT é uma empresa especializada na fabricação de Válvulas Injetoras. Localizada no município de Registro – SP á 190 Km da Capital, a MULT POINT é uma empresa 100% brasileira."
            />
            <ValueAbout />
            <span></span>
        </section>
    );
};

export default HomeAbout;
