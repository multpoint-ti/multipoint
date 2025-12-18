import { NextRequest, NextResponse } from 'next/server';
import eventsData from '@/data/events.json';
import { Event, EventListItem } from '@/shared/types/event-types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const type = searchParams.get('type');
  const upcoming = searchParams.get('upcoming'); // 'true' para eventos futuros

  let events = eventsData as Event[];

  // Filtrar por tipo
  if (type) {
    events = events.filter(event => event.type === type);
  }

  // Filtrar eventos futuros ou passados
  const now = new Date();
  if (upcoming === 'true') {
    events = events.filter(event => new Date(event.date) >= now);
  } else if (upcoming === 'false') {
    events = events.filter(event => new Date(event.date) < now);
  }

  // Ordenar por data (mais recentes primeiro para passados, próximos primeiro para futuros)
  events.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return upcoming === 'true' ? dateA - dateB : dateB - dateA;
  });

  // Calcular paginação
  const total = events.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Aplicar paginação
  const paginatedEvents = events.slice(startIndex, endIndex);

  // Converter para formato de listagem
  const eventsList: EventListItem[] = paginatedEvents.map(event => ({
    id: event.id,
    slug: event.slug,
    name: event.name,
    date: event.date,
    imagePath: event.imagePath,
    type: event.type,
  }));

  return NextResponse.json({
    events: eventsList,
    total,
    totalPages,
    currentPage: page,
  });
}
