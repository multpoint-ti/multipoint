"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '@/shared/types/product-types';
import SectionTagName from '@/shared/section-tag-name';

interface ProductRecommendationsProps {
    currentProductId: number;
    productLine: string;
}

export function ProductRecommendations({ currentProductId, productLine }: ProductRecommendationsProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/products?productLine=${productLine}&limit=10`);
                if (response.ok) {
                    const data = await response.json();
                    const filteredProducts = data.products
                        .filter((p: Product) => p.id !== currentProductId)
                        .slice(0, 10);
                    setProducts(filteredProducts);
                }
            } catch (error) {
                console.error('Erro ao carregar recomendações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentProductId, productLine]);

    if (loading || products.length === 0) {
        return null;
    }

    return (
        <div className="w-full overflow-hidden">
            <div className='flex justify-between items-center'>
                <SectionTagName text='OUTROS PRODUTOS' />
                <div className="flex">
                    <button
                        onClick={scrollPrev}
                        className={`px-2 hover:transition-colors ${!canScrollPrev ? 'opacity-50' : 'text-blue-ignition cursor-pointer'}`}
                        disabled={!canScrollPrev}
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className={`px-2 hover:transition-colors ${!canScrollNext ? 'opacity-50' : 'text-blue-ignition cursor-pointer'}`}
                        disabled={!canScrollNext}
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 md:gap-6 lg:gap-16">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-[0_0_140px] md:flex-[0_0_180px] lg:flex-[0_0_200px] flex flex-col items-center"
                        >
                            {/* Product Image */}
                            <div className="rounded-lg p-4 aspect-square flex items-center justify-center">
                                <Image
                                    src={product.images[0]?.path || '/imgs/placeholder.png'}
                                    alt={product.multpointCode}
                                    width={200}
                                    height={200}
                                    className="object-contain w-32 h-full"
                                />
                            </div>

                            {/* Multipoint Code with blue border */}
                            <div className="mt-4 pb-2 border-b-1 border-blue-gravel-mist w-full">
                                <p className="font-medium text-lg lg:text-2xl text-center text-blue-gravel-mist">{product.multpointCode}</p>
                            </div>

                            {/* Ver mais link */}
                            <Link
                                href={`/produtos/${product.id}`}
                                className="flex items-center gap-2 mt-3 text-blue-gravel-mist hover:underline uppercase text-sm"
                            >
                                Ver mais
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
