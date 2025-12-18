import Image, { StaticImageData } from 'next/image';
import SectionTagName from '@/shared/section-tag-name';
import { Button } from '@/shared/button';
import { ArrowRightIcon } from 'lucide-react';
import { ReactNode } from 'react';

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
    image: StaticImageData | string;
    imageAlt?: string;
    tagName: string;
    title: ReactNode;
    description: string;
    variant?: 'left' | 'right';
    hideExtras?: boolean;
}

export default function AboutSection({
    image,
    imageAlt = 'Imagem',
    tagName,
    title,
    description,
    variant = 'left',
    hideExtras = false,
}: AboutSectionProps) {
    return (
        <div className='flex flex-col items-center w-full max-w-7xl'>
            <div className={`flex flex-col items-center gap-2 md:gap-12 w-full ${variant === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center justify-center">
                    <Image
                        src={image}
                        alt={imageAlt}
                        className="rounded-lg w-auto max-h-[500px]"
                    />
                </div>
                <div className="text-center md:text-start items-center md:items-start md:w-1/2 flex flex-col gap-4 px-8">
                    <SectionTagName text={tagName} />
                    <h1 className="text-3xl md:text-5xl font-medium text-center md:text-start max-w-3xl leading-tight">
                        {title}
                    </h1>
                    <p className="text-base md:text-lg">
                        {description}
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
                                <a href="" className='hidden md:flex flex-row pt-8 justify-start items-center w-fit font-medium text-blue-ignition'>
                                    Saiba mais sobre nós
                                    <ArrowRightIcon className="h-4 text-blue-ignition" />
                                </a>
                            </div>
                            <Button variant='outline' size='default' className='flex md:hidden'>
                                Saiba mais sobre nós
                                <ArrowRightIcon className="h-4 text-blue-ignition" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
