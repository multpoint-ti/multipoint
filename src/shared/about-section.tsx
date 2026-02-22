import Image, { StaticImageData } from 'next/image';
import SectionTagName from '@/shared/section-tag-name';
import { Button } from '@/shared/button';
import { ArrowRightIcon } from 'lucide-react';
import { ReactNode } from 'react';
import Link from 'next/link';

const aboutItems = [
    {
        id: 1,
        title: '+10 anos',
        description: 'no mercado de reposição automotiva',
    },
    {
        id: 2,
        title: '100%',
        description: 'brasileira com tecnologia própria',
    },
    {
        id: 3,
        title: '17 estados',
        description: 'com representantes em todo o Brasil',
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
                <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center justify-center md:p-6">
                    <Image
                        src={image}
                        alt={imageAlt}
                        className="object-cover rounded-xl aspect-square"
                    />
                </div>
                <div className="text-center md:text-start items-center md:items-start md:w-1/2 flex flex-col gap-4">
                    <SectionTagName text={tagName} />
                    <h1 className="text-3xl md:text-5xl font-medium text-center md:text-start max-w-3xl leading-tight">
                        {title}
                    </h1>
                    <p className="text-base md:text-lg text-justify">
                        {description}
                    </p>
                    {!hideExtras && (
                        <>
                            <div className='hidden md:block'>
                                <div className="flex gap-4">
                                    {aboutItems.map((item) => (
                                        <div key={item.id} className="">
                                            <h2 className="text-3xl font-bold">{item.title}</h2>
                                            <p className="text-sm">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <a href="/sobre-nos" className='text-blue-gravel-mist hidden md:flex flex-row pt-8 justify-start items-center w-fit font-medium text-blue-ignition hover:underline'>
                                    Saiba mais sobre nós
                                    <ArrowRightIcon className="h-4 text-blue-ignition" />
                                </a>
                            </div>
                            <Link href="/sobre-nos">
                                <Button variant='outline' size='default' className='flex md:hidden'>
                                    Saiba mais sobre nós
                                    <ArrowRightIcon className="h-4 text-blue-ignition" />
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
