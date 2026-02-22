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
        description: 'Acreditamos que integridade e transparência são fundamentais. Valorizamos a ética em todas as nossas relações com clientes, fornecedores e colaboradores, fortalecendo parcerias duradouras.',
    },
    {
        id: 2,
        image: ValueAboutImag2,
        title: 'Precisão e Qualidade',
        description: 'Cada válvula injetora passa por rigoroso controle de qualidade, desde a seleção de matérias-primas até a finalização, garantindo produtos com performance equiparada à original.',
    },
    {
        id: 3,
        image: ValueAboutImag3,
        title: 'Inovação e Evolução Contínua',
        description: 'Investimos em tecnologia de ponta e na capacitação contínua da nossa equipe, assegurando produtos eficientes, duráveis e confiáveis para o mercado automotivo.',
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
        <section className="max-w-7xl flex flex-col items-center">
            {/** For large screens */}
            <div className='flex flex-col items-center gap-4 md:gap-16'>
                <div className='flex flex-col items-center gap-4'>
                    <SectionTagName text='Nossos Valores' />
                    <h1 className="text-3xl font-medium text-center md:text-start max-w-3xl leading-tight">
                        Mais do que peças. <span className="text-blue-ignition font-bold">Entregamos Valor.</span>
                    </h1>
                </div>
                <div className="hidden md:flex flex-col md:flex-row items-stretch gap-2 md:gap-12 lg:gap-20">
                    {valuesAboutItems.map((item) => (
                        <div key={item.id} className="flex flex-col items-center gap-2 text-center bg-gray-100 px-4 py-8 flex-1">
                            <Image
                                src={item.image}
                                alt={item.title}
                                className="rounded-lg h-12 w-12 bg-blue-ignition p-2 mb-2"
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
            <div className='md:hidden overflow-hidden mt-4' ref={emblaRef}>
                <div className='flex max-w-xs'>
                    {valuesAboutItems.map((item) => (
                        <div key={item.id} className="flex-shrink-0 w-full flex justify-center pb-4">
                            <div className="flex flex-col items-center gap-2 text-center bg-gray-100 p-4 rounded-xl">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-lg h-12 w-12 bg-blue-ignition p-2 mb-2"
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
            <div className="md:hidden flex gap-2 items-center">
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
