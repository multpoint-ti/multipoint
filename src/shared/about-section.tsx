import Image from 'next/image';
import HomeAboutImage from '../../public/imgs/man-with-a-car.png';
import SectionTagName from '@/shared/section-tag-name';
import { Button } from '@/shared/button';
import { ArrowRightIcon } from 'lucide-react';

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

interface AboutSectionProps {
    hideExtras?: boolean;
}

export default function AboutSection({ hideExtras = false }: AboutSectionProps) {
    return (
        <div className='flex flex-col items-center w-full max-w-7xl'>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-12 w-full">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <Image
                        src={HomeAboutImage}
                        alt="Quem Somos"
                        className="rounded-lg w-full p-10"
                    />
                </div>
                <div className="text-center md:text-start items-center md:items-start md:w-1/2 flex flex-col gap-4">
                    <SectionTagName text='Quem somos' />
                    <h1 className="text-3xl md:text-5xl font-medium text-center md:text-start max-w-3xl leading-tight">
                        Somos uma empresa <span className="text-blue-gravel-mist font-bold">100% brasileira</span>
                    </h1>
                    <p className="text-base md:text-lg">
                        A MULT POINT é uma empresa especializada na fabricação de Válvulas Injetoras. Localizada no município de Registro – SP á 190 Km da Capital, a MULT POINT é uma empresa 100% brasileira.
                    </p>
                    {!hideExtras && (
                        <>
                            <div className='hidden md:block'>
                                <div className="flex gap-4">
                                    {aboutItems.map((item) => (
                                        <div key={item.id} className="max-w-[150px]">
                                            <h2 className="text-3xl font-bold text-blue-gravel-mist">{item.title}</h2>
                                            <p className="text-sm">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <a href="" className='hidden md:flex flex-row pt-8 justify-start items-center w-fit font-medium text-red-amber-torque'>
                                    Saiba mais sobre nós
                                    <ArrowRightIcon className="h-4 text-red-amber-torque" />
                                </a>
                            </div>
                            <Button variant='outline' size='default' className='flex md:hidden'>
                                Saiba mais sobre nós
                                <ArrowRightIcon className="h-4 text-red-amber-torque" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
