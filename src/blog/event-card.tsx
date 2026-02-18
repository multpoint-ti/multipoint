"use client";

import Image from 'next/image';
import Link from 'next/link';
import { EventListItem } from '@/shared/types/event-types';
import SectionTagName from '@/shared/section-tag-name';
import { ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: EventListItem;
}

export function getEventYear(dateString: string): string {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/eventos/${event.slug}`} className="block h-full">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col px-6 py-8 gap-6 h-full hover:cursor-pointer hover:border-gray-400 transition-all duration-300">
        {/* Header com tag e ano */}
        <div className="flex justify-between items-center">
          <SectionTagName text="eventos" />
          <span className="text-sm text-gray-500">{getEventYear(event.date)}</span>
        </div>

        {/* Título do Evento */}
        <div className="">
          <h3 className="text-lg md:text-xl font-medium line-clamp-2">
            {event.name}
          </h3>
        </div>

        {/* Imagem do Evento */}
        <div className="relative w-full h-68 flex-shrink-0 rounded-lg">
          {event.imagePath ? (
            <Image
              src={event.imagePath}
              alt={event.name}
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              Sem imagem
            </div>
          )}
        </div>

        {/* Link Saber Mais */}
        <div className="">
          <div className='flex gap-1 items-center'>
            <ArrowRight className="w-4 h-4 text-red-amber-torque" />
            <p className='text-sm'>Saber mais</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
