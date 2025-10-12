import Image from 'next/image';
import HomeAboutImage from '../../public/imgs/about/home-about.png';
import SectionTagName from '@/shared/section-tag-name';
import Arrow from '../../public/imgs/arrow.svg';
import { Button } from '@/shared/button';
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react';

const aboutItems = [
    {
        id: 1,
        title: '+10 anos',
        description: 'no mercado de válvulas',
    },
    {
        id: 2,
        title: '+10 anos',
        description: 'no mercado de válvulas',
    },
    {
        id: 3,
        title: '+10 anos',
        description: 'no mercado de válvulas',
    },
]

const HomeAbout = () => {
    return (
        <section className="max-w-6xl flex flex-col items-center gap-4 md:gap-8">
            <h1 className="text-3xl md:text-5xl font-medium text-center max-w-3xl leading-tight">
                A maior empresa de <span className="text-red-amber-torque">válvulas injetoras</span> do Brasil
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <Image
                        src={HomeAboutImage}
                        alt="Quem Somos"
                        className="rounded-lg w-full"
                    />
                </div>
                <div className="text-center md:text-start items-center md:items-start md:w-1/2 flex flex-col gap-4">
                    <SectionTagName text='Quem somos' />
                    <h1 className="text-3xl md:text-5xl font-medium text-center md:text-start max-w-3xl leading-tight">
                        Somos uma empresa <span className="text-blue-gravel-mist font-bold">100% brasileira</span>
                    </h1>
                    <p className="text-base md:text-lg">
                        A MULTPOINT é uma empresa especializada na fabricação de Válvulas Injetoras. Localizada no município de Registro – SP á 190 Km da Capital, a MULTPOINT é uma empresa 100% brasileira.
                    </p>
                    <div className='hidden md:block'>
                        <div className="flex gap-4">
                            {aboutItems.map((item) => (
                                <div key={item.id} className="max-w-[150px]">
                                    <h2 className="text-3xl font-bold text-blue-gravel-mist">{item.title}</h2>
                                    <p className="text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <a href="" className='flex flex-row pt-8 justify-start items-center w-fit font-medium text-red-amber-torque'>
                            Saiba mais sobre nós
                            <Image
                                src={Arrow}
                                alt="Saiba mais sobre nós"
                                className="h-2"
                            />
                        </a>
                    </div>
                    <Button variant='outline' size='default'>
                        Saiba mais sobre nós
                        <ArrowRightIcon className="h-4 text-red-amber-torque" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;