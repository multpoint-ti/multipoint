"use client";

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import SectionTagName from '@/shared/section-tag-name';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type ProductCardData = {
    id: number;
    line: string;
    subtitle: string;
    href: string;
    image: string;
};

const productCards: ProductCardData[] = [
    {
        id: 1,
        line: 'Válvulas Injetoras',
        subtitle: 'Magneti Marelli',
        href: '/produtos?productLine=VALVULAS_INJETORAS&automaker=Magneti%20Marelli',
        image: '/imgs/uploads/2023/02/mp001.jpg',
    },
    {
        id: 2,
        line: 'Válvulas Injetoras',
        subtitle: 'Magneti Marelli IPE',
        href: '/produtos?productLine=VALVULAS_INJETORAS&automaker=Magneti%20Marelli%20IPE',
        image: '/imgs/mpe009.jpg',
    },
    {
        id: 3,
        line: 'Válvulas Injetoras',
        subtitle: 'Bosch',
        href: '/produtos?productLine=VALVULAS_INJETORAS&automaker=Bosch',
        image: '/imgs/uploads/2023/02/MP156403.jpg',
    },
    {
        id: 4,
        line: 'Válvulas Injetoras',
        subtitle: 'Delphi',
        href: '/produtos?productLine=VALVULAS_INJETORAS&automaker=Delphi',
        image: '/imgs/uploads/2024/04/mp10732.jpg',
    },
    {
        id: 5,
        line: 'Válvulas Injetoras',
        subtitle: 'Arla',
        href: '/produtos?productLine=VALVULAS_INJETORAS&automaker=Arla',
        image: '/imgs/uploads/2023/02/mp032.jpg',
    },
    {
        id: 6,
        line: 'Válvulas Injetoras',
        subtitle: 'Motocicletas',
        href: '/produtos?productLine=VALVULAS_INJETORAS&automaker=Motocicletas',
        image: '/imgs/uploads/2023/02/mp063.jpg',
    },
    {
        id: 7,
        line: "Kit's Reparo do Bico Injetor",
        subtitle: '',
        href: '/produtos?productLine=KITS_PARA_BICO_INJETOR',
        image: '/imgs/uploads/2023/02/mp1001-170.jpg',
    },
    {
        id: 8,
        line: 'Maleta de O-ring',
        subtitle: '',
        href: '/produtos?productLine=MALETA_ORING',
        image: '/imgs/uploads/2023/02/mp1050.jpg',
    },
    {
        id: 9,
        line: 'Guarnição da Flange do Módulo de Combustível',
        subtitle: '',
        href: '/produtos?productLine=GUARNICOES',
        image: '/imgs/uploads/2023/02/mp2001.jpg',
    },
    {
        id: 10,
        line: 'Adaptadores, Engates Rápidos e Travas',
        subtitle: '',
        href: '/produtos?productLine=CONECTORES_E_TRAVAS',
        image: '/imgs/uploads/2023/02/MPC001.jpg',
    },
];

const ProductsLineCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        align: 'start',
    });
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

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
        <section className="w-full bg-gray-soft py-12 md:px-20 md:py-20 flex flex-col items-center">
            <div className="w-full flex flex-col gap-4 md:gap-8 max-w-7xl pl-6 md:pl-0">
                {/** header */}
                <div className='flex justify-between'>
                    <SectionTagName text='LINHAS DE PRODUTOS' />
                    <div className='hidden md:flex gap-2'>
                        <button onClick={scrollPrev} className="bg-transparent border-none cursor-pointer">
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-blue-ignition" />
                        </button>
                        <button onClick={scrollNext} className="bg-transparent border-none cursor-pointer">
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-blue-ignition" />
                        </button>
                    </div>
                </div>

                {/** carousel */}
                <div className="overflow-hidden w-full" ref={emblaRef}>
                    <div className="flex w-full">
                        {productCards.map((card) => (
                            <a key={card.id} className="flex-shrink-0 pr-4 md:pr-6" href={card.href}>
                                <div className="bg-white w-full min-w-64 md:min-w-74 max-w-64 md:max-w-74 h-96 overflow-hidden relative group cursor-pointer flex flex-col items-center gap-12">
                                    <div className="relative z-10 px-6 w-full flex flex-col items-start">
                                        <div className="border-l-4 border-blue-gravel-mist group-hover:border-white pl-4 pt-12 transition-colors duration-300">
                                            <h3 className={`font-bold uppercase text-blue-gravel-mist group-hover:text-white transition-colors duration-300 ${card.subtitle ? 'text-xs' : 'text-base md:text-lg leading-tight font-medium'}`}>{card.line}</h3>
                                            {card.subtitle && <p className="text-lg md:text-2xl font-medium text-blue-gravel-mist group-hover:text-white transition-colors duration-300">{card.subtitle}</p>}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <Image
                                            src={card.image}
                                            alt={card.subtitle ? `${card.line} - ${card.subtitle}` : card.line}
                                            width={300}
                                            height={200}
                                            className="w-48 md:w-50 h-auto object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <p className="text-white font-medium text-base border-b-2 border-white w-fit">PRODUTOS</p>
                                    </div>
                                    <div className="absolute inset-0 bg-blue-gravel-mist opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsLineCarousel;
