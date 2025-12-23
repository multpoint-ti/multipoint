"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { EventListItem } from '@/shared/types/event-types';
import { EventCard } from './event-card';
import SectionTagName from '@/shared/section-tag-name';

interface EventRecommendationsProps {
    currentSlug: string;
}

export function EventRecommendations({ currentSlug }: EventRecommendationsProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    });
    const [events, setEvents] = useState<EventListItem[]>([]);
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
        const fetchEvents = async () => {
            try {
                const response = await fetch(`/api/events?limit=6`);
                if (response.ok) {
                    const data = await response.json();
                    const filteredEvents = data.events
                        .filter((e: EventListItem) => e.slug !== currentSlug)
                        .slice(0, 5);
                    setEvents(filteredEvents);
                }
            } catch (error) {
                console.error('Erro ao carregar recomendações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [currentSlug]);

    if (loading || events.length === 0) {
        return null;
    }

    return (
        <div className="w-full overflow-hidden">
            <div className='flex justify-between items-center mb-4'>
                <SectionTagName text="OUTROS EVENTOS" />
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
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="flex-[0_0_280px] md:flex-[0_0_320px] lg:flex-[0_0_350px]"
                        >
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
