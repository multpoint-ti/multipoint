"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { NewsListItem } from '@/shared/types/blog-types';
import { BlogCard } from './blog-card';
import SectionTagName from '@/shared/section-tag-name';

interface BlogRecommendationsProps {
    currentSlug: string;
    type?: 'NOTICIA' | 'EVENTO';
}

export function BlogRecommendations({ currentSlug, type }: BlogRecommendationsProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    });
    const [news, setNews] = useState<NewsListItem[]>([]);
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
        const fetchNews = async () => {
            try {
                const typeParam = type ? `&type=${type}` : '';
                const response = await fetch(`/api/blog?limit=6${typeParam}`);
                if (response.ok) {
                    const data = await response.json();
                    const filteredNews = data.news
                        .filter((n: NewsListItem) => n.slug !== currentSlug)
                        .slice(0, 5);
                    setNews(filteredNews);
                }
            } catch (error) {
                console.error('Erro ao carregar recomendações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [currentSlug, type]);

    if (loading || news.length === 0) {
        return null;
    }

    const title = type === 'EVENTO' ? 'OUTROS EVENTOS' : 'OUTRAS NOTÍCIAS';

    return (
        <div className="w-full overflow-hidden">
            <div className='flex justify-between items-center mb-4'>
                <SectionTagName text={title} />
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
                <div className="flex gap-4 md:gap-6">
                    {news.map((item) => (
                        <div
                            key={item.id}
                            className="flex-[0_0_280px] md:flex-[0_0_320px] lg:flex-[0_0_350px]"
                        >
                            <BlogCard news={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
