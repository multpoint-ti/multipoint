"use client"

import Image from 'next/image';
import ValueAboutImag1 from '../../public/imgs/about/value-about-1.svg';
import ValueAboutImag2 from '../../public/imgs/about/value-about-2.svg';
import ValueAboutImag3 from '../../public/imgs/about/value-about-3.svg';
import SectionTagName from './section-tag-name';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const valuesAboutItems = [
    {
        id: 1,
        image: ValueAboutImag1,
        title: 'Transparência e Confiança',
        description: 'Valorizamos relações transparentes e duradouras com nossos clientes, parceiros e colaboradores, baseadas na ética, respeito e confiança mútua.',
    },
    {
        id: 2,
        image: ValueAboutImag2,
        title: 'Precisão Técnica',
        description: 'Cada peça é desenvolvida com máxima precisão e rigor técnico, garantindo eficiência e desempenho no funcionamento dos sistemas injetores.',
    },
    {
        id: 3,
        image: ValueAboutImag3,
        title: 'Inovação e Evolução Contínua',
        description: 'Investimos constantemente na melhoria de processos para acompanhar as exigências do mercado e impulsionar nosso crescimento.',
    },
]

const ValuesSectionAbout = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="max-w-6xl flex flex-col items-center">
            {/** For large screens */}
            <div className='flex flex-col items-center gap-4 md:gap-16'>
                <div className='flex flex-col items-center gap-4'>
                    <SectionTagName text='Nossos Valores' />
                    <h1 className="text-3xl font-medium text-center md:text-start max-w-3xl leading-tight">
                        Mais do que peças. <span className="text-blue-gravel-mist font-medium">Entregamos Valor.</span>
                    </h1>
                </div>
                <div className="hidden lg:flex flex-col md:flex-row items-center gap-2 md:gap-8">
                    {valuesAboutItems.map((item) => (
                        <div key={item.id} className="flex flex-col items-center gap-2 text-center">
                            <Image
                                src={item.image}
                                alt={item.title}
                                className="rounded-lg h-12 w-12 bg-blue-gravel-mist p-2 mb-2"
                            />
                            <h3 className="text-base md:text-lg font-semibold">
                                {item.title}
                            </h3>
                            <p className="text-sm md:text-base max-w-xs">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/** For small screens */}
            <div className='lg:hidden overflow-hidden mt-4' ref={emblaRef}>
                <div className='flex max-w-xs'>
                    {valuesAboutItems.map((item) => (
                        <div key={item.id} className="flex-shrink-0 w-full flex justify-center p-4">
                            <div className="flex flex-col items-center gap-2 text-center bg-gray-100 p-4 rounded-xl">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-lg h-12 w-12 bg-blue-gravel-mist p-2 mb-2"
                                />
                                <h3 className="text-base md:text-lg font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-sm md:text-base">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:hidden flex gap-2 items-center">
                {scrollSnaps.map((_, index) => (
                    <button key={index} onClick={() => scrollTo(index)} className="p-0 bg-transparent border-none">
                        <div
                            className={`w-2 h-2 rounded-full cursor-pointer transition duration-300 ${index === selectedIndex ? 'bg-red-amber-torque w-6' : 'bg-gray-400'
                                }`}
                        />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default ValuesSectionAbout;
