"use client";

import Link from 'next/link';
import { EventListItem } from '@/shared/types/event-types';
import SectionTagName from '@/shared/section-tag-name';
import { Button } from '@/shared/button';

interface NextEventCardProps {
  event: EventListItem;
}

export function getEventYear(dateString: string): string {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function NextEventCard({ event }: NextEventCardProps) {
  return (
    <div className="bg-blue-ignition rounded-3xl overflow-hidden flex flex-col px-6 py-8 gap-8 h-full text-white">
      {/* Header com tag e ano */}
      <div className="flex justify-between items-center">
        <SectionTagName text="eventos" className="text-white" />
        <span className="text-sm text-white/70">{getEventYear(event.date)}</span>
      </div>

      {/* Título do Evento */}
      <div className="flex-grow">
        <h3 className="text-lg md:text-xl font-medium line-clamp-2">
          {event.name}
        </h3>
        <p className="text-sm text-white/70 mt-2">
          {formatEventDate(event.date)}
        </p>
      </div>

      {/* Botão Saber Mais */}
      <div className="">
        <Link href={`/eventos/${event.slug}`}>
          <Button variant="white" size="default">
            Saber mais
          </Button>
        </Link>
      </div>
    </div>
  );
}
