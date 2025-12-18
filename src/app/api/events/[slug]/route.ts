import { NextRequest, NextResponse } from 'next/server';
import eventsData from '@/data/events.json';
import { Event } from '@/shared/types/event-types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const events = eventsData as Event[];

  const event = events.find(e => e.slug === slug);

  if (!event) {
    return NextResponse.json(
      { error: 'Evento não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}
