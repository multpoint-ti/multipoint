"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { EventListItem } from '@/shared/types/event-types';
import { EventCard } from './event-card';

interface EventsCarouselProps {
  events: EventListItem[];
}

export function EventsCarousel({ events }: EventsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });
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

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum evento encontrado.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] pl-2"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots para navegação */}
      {scrollSnaps.length > 1 && (
        <div className="flex gap-2 items-center justify-center pt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="p-0 bg-transparent border-none"
            >
              <div
                className={`w-2 h-2 rounded-full cursor-pointer transition duration-300 ${
                  index === selectedIndex ? 'bg-red-amber-torque w-6' : 'bg-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
