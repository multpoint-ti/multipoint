import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventDetailComponent from '@/blog/event-detail';
import { eventRepository } from '@/api/events/repositories/event-repository';
import { generateEventMetadata, generateEventJsonLd } from '@/lib/seo';
import { JsonLd } from '@/shared/json-ld';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string) {
  return eventRepository.getBySlug(slug);
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: 'Evento não encontrado' };
  }

  return generateEventMetadata(event);
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <JsonLd data={generateEventJsonLd(event)} />
      <EventDetailComponent slug={slug} />
    </>
  );
}
