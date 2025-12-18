'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/shared/types/event-types';
import { Menu } from '@/shared/menu';
import { Footer } from '@/shared/footer';
import PageContainer from '@/shared/page-container';
import { Breadcrumb } from '@/shared/breadcrumb';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import SectionTagName from '@/shared/section-tag-name';

interface EventDetailProps {
  slug: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function getEventTypeLabel(type: string): string {
  const labels: { [key: string]: string } = {
    'FEIRA': 'Feira',
    'WORKSHOP': 'Workshop',
    'PALESTRA': 'Palestra',
    'OUTRO': 'Evento',
  };
  return labels[type] || 'Evento';
}

export default function EventDetailComponent({ slug }: EventDetailProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [otherEvents, setOtherEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = () => {
      setLoading(true);

      Promise.all([
        fetch(`/api/events/${slug}`).then(res => {
          if (!res.ok) throw new Error('Evento não encontrado');
          return res.json();
        }),
        fetch('/api/events?limit=4').then(res => res.json())
      ])
        .then(([currentEvent, allEventsResponse]) => {
          setEvent(currentEvent);
          const filtered = (allEventsResponse.events || [])
            .filter((e: Event) => e.slug !== slug)
            .slice(0, 3);
          setOtherEvents(filtered);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className='flex flex-col items-center w-full'>
        <Menu />
        <PageContainer>
          <div className='py-12 animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/3 mb-8'></div>
            <div className='h-64 bg-gray-200 rounded mb-8'></div>
            <div className='h-4 bg-gray-200 rounded w-full mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-full mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-2/3'></div>
          </div>
        </PageContainer>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className='flex flex-col items-center w-full'>
        <Menu />
        <PageContainer>
          <div className='py-12 text-center'>
            <p className='text-red-amber-torque mb-4'>Erro: {error}</p>
            <Link href='/blog' className='text-blue-gravel-mist hover:underline'>
              Voltar para o blog
            </Link>
          </div>
        </PageContainer>
        <Footer />
      </div>
    );
  }

  const formatText = (text: string) => {
    return text
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className='text-2xl font-semibold mt-8 mb-4'>
              {paragraph.replace('## ', '')}
            </h2>
          );
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className='text-xl font-semibold mt-6 mb-3'>
              {paragraph.replace('### ', '')}
            </h3>
          );
        }

        if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- '));
          return (
            <ul key={index} className='list-disc list-inside space-y-2 my-4'>
              {items.map((item, i) => (
                <li key={i} className='text-gray-700'>
                  {formatInlineText(item.replace('- ', ''))}
                </li>
              ))}
            </ul>
          );
        }

        if (/^\d+\.\s/.test(paragraph)) {
          const items = paragraph.split('\n').filter(line => /^\d+\.\s/.test(line));
          return (
            <ol key={index} className='list-decimal list-inside space-y-2 my-4'>
              {items.map((item, i) => (
                <li key={i} className='text-gray-700'>
                  {formatInlineText(item.replace(/^\d+\.\s/, ''))}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={index} className='text-gray-700 leading-relaxed mb-4'>
            {formatInlineText(paragraph)}
          </p>
        );
      });
  };

  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />

      <PageContainer>
        <div className='flex max-w-7xl lg:space-x-16'>

          <div className='space-y-8 w-full lg:w-3/4'>
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: 'Blog', href: '/blog' },
                { label: 'Eventos', href: '/blog' },
                { label: event.name },
              ]}
            />
            {/* Cabeçalho */}
            <div className=''>
              {/* Tag do tipo de evento */}
              <div className='mb-4'>
                <SectionTagName text={getEventTypeLabel(event.type)} />
              </div>
              {/* Título */}
              <h1 className='text-3xl md:text-4xl font-bold mb-4'>
                {event.name}
              </h1>
              {/* Data e Local */}
              <div className='flex flex-col sm:flex-row sm:items-center gap-4 text-gray-500 text-sm'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  <span>{formatDate(event.date)}</span>
                </div>
                {event.local && (
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4' />
                    <span>{event.local}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Imagem Principal */}
            {event.imagePath && (
              <div className='relative w-full h-64 md:h-[500px] overflow-hidden'>
                <Image
                  src={event.imagePath}
                  alt={event.name}
                  fill
                  className='object-cover'
                />
              </div>
            )}
            {/* Conteúdo */}
            <article className='prose prose-lg max-w-none'>
              {formatText(event.text)}
            </article>
            {/* Galeria de Imagens */}
            {event.galleryImagesPaths && event.galleryImagesPaths.length > 0 && (
              <div className='mt-12'>
                <h3 className='text-xl font-semibold mb-4'>Galeria</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {event.galleryImagesPaths.map((image) => (
                    <div key={image.id} className='relative h-48 rounded-lg overflow-hidden'>
                      <Image
                        src={image.path}
                        alt='Imagem da galeria'
                        fill
                        className='object-cover hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Divisor */}
            <div className='border-t border-gray-200 mt-12 pt-8'>
              <Link
                href='/blog'
                className='inline-flex items-center gap-2 text-blue-gravel-mist hover:underline'
              >
                <ArrowLeft className='w-4 h-4' />
                Ver todos os eventos
              </Link>
            </div>
          </div>

          <div className='hidden lg:block w-full lg:w-1/4'>
            <div className='sticky top-8 space-y-8'>
              <SectionTagName text='Mais Eventos' />
              <div className='space-y-4'>
                {otherEvents.map((item) => (
                  <div key={item.id}>
                    <Link
                      href={`/eventos/${item.slug}`}
                      className='block group'
                    >
                      <h4 className='group-hover:underline transition-colors'>
                        {item.name}
                      </h4>
                      <p className='text-sm text-gray-500 mt-1'>{formatDate(item.date)}</p>
                    </Link>
                    <div className='border-b border-gray-oxide-steel mt-4'></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
