import ValueAbout from '@/shared/values-about';
import AboutSection from '@/shared/about-section';

const HomeAbout = () => {
    return (
        <section className="max-w-7xl flex flex-col items-center gap-20">
            <h1 className="text-3xl md:text-5xl font-medium text-center max-w-3xl leading-tight">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </h1>
            <AboutSection />
            <ValueAbout />
            <span></span>
        </section>
    );
};

export default HomeAbout;
