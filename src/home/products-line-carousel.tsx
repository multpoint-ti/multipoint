"use client";

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import SectionTagName from '@/shared/section-tag-name';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import productsData from '@/data/product.json';

type ProductCardData = {
    id: number;
    line: string;
    lineKey: string;
    automaker: string;
    image: string;
    count: number;
};

const formatProductLineName = (line: string): string => {
    const names: { [key: string]: string } = {
        'VALVULAS_INJETORAS': 'Válvulas Injetoras',
        'KITS_PARA_BICO_INJETOR': 'Kits para Bico Injetor',
        'GUARNICOES': 'Guarnições',
        'CONECTORES_E_TRAVAS': 'Conectores e Travas',
        'DELPHI': 'Delphi',
        'OUTROS': 'Outros Produtos',
    };
    return names[line] || line;
};

const getProductCardsData = (): ProductCardData[] => {
    const cards: ProductCardData[] = [];
    let id = 1;

    const lines = [...new Set(productsData.map((p: { productLine: string }) => p.productLine))];

    lines.forEach((line) => {
        const productsInLine = productsData.filter((p: { productLine: string }) => p.productLine === line);
        const automakers = [...new Set(productsInLine.flatMap((p: { automakers: { name: string }[] }) =>
            p.automakers.map(a => a.name)
        ))];

        automakers.forEach((automaker) => {
            const productsForAutomaker = productsInLine.filter((p: { automakers: { name: string }[] }) =>
                p.automakers.some(a => a.name === automaker)
            );
            const firstWithImage = productsForAutomaker.find((p: { images?: { path: string }[] }) => p.images && p.images.length > 0);

            cards.push({
                id: id++,
                line: formatProductLineName(line),
                lineKey: line,
                automaker: automaker as string,
                image: firstWithImage?.images?.[0]?.path || '/imgs/products/image 36.png',
                count: productsForAutomaker.length,
            });
        });
    });

    return cards;
};

const productCards = getProductCardsData();

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
                    <div className="flex w-full gap-4 md:gap-6">
                        {productCards.map((card) => (
                            <a key={card.id} className="flex-shrink-0" href={`/produtos?productLine=${card.lineKey}&automaker=${encodeURIComponent(card.automaker)}`}>
                                <div className="bg-white w-full min-w-64 md:min-w-74 h-96 overflow-hidden relative group cursor-pointer flex flex-col items-center gap-12">
                                    <div className="relative z-10 px-6 w-full flex flex-col items-start">
                                        <div className="border-l-4 border-blue-gravel-mist group-hover:border-white pl-4 pt-12 transition-colors duration-300">
                                            <h3 className="text-xs font-bold uppercase text-blue-gravel-mist group-hover:text-white transition-colors duration-300">{card.line}</h3>
                                            <p className="text-lg md:text-2xl font-medium text-blue-gravel-mist group-hover:text-white transition-colors duration-300">{card.automaker}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <Image
                                            src={card.image}
                                            alt={`${card.line} - ${card.automaker}`}
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