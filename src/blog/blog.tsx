'use client';

import PageContainer from '@/shared/page-container';
import { Footer } from '@/shared/footer';
import { Menu } from '@/shared/menu';
import { useEffect, useState } from 'react';
import { NewsListItem, NewsType } from '@/shared/types/blog-types';
import { EventListItem } from '@/shared/types/event-types';
import { BlogCard } from './blog-card';
import { BlogCardFeatured } from './blog-card-featured';
import { BlogCardSkeleton } from './blog-card-skeleton';
import { EventsCarousel } from './events-carousel';
import { EventCardSkeleton } from './event-card-skeleton';
import { NextEventsCarousel } from './next-events-carousel';
import { NextEventCardSkeleton } from './next-event-card-skeleton';
import Image from 'next/image';
import Pagination from '@/shared/pagination';

interface ApiResponse {
  news: NewsListItem[];
  count: number;
  totalPages: number;
  currentPage: number;
}

export default function BlogListPageComponent() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState<EventListItem[]>([]);
  const [upcomingEventsLoading, setUpcomingEventsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [type, setType] = useState<NewsType | ''>('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    setPage(1);
  }, [search, type]);

  // Fetch eventos passados
  useEffect(() => {
    setEventsLoading(true);
    fetch('/api/events?limit=10&upcoming=false')
      .then(response => response.json())
      .then(data => {
        setEvents(data.events || []);
        setEventsLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setEventsLoading(false);
      });
  }, []);

  // Fetch próximos eventos (futuros)
  useEffect(() => {
    setUpcomingEventsLoading(true);
    fetch('/api/events?limit=10&upcoming=true')
      .then(response => response.json())
      .then(data => {
        setUpcomingEvents(data.events || []);
        setUpcomingEventsLoading(false);
      })
      .catch(() => {
        setUpcomingEvents([]);
        setUpcomingEventsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchNews = () => {
      setLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append('search', search);
      if (type) params.append('type', type);
      if (sortBy) params.append('sortBy', sortBy);

      fetch(`/api/blog?${params.toString()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchNews();
  }, [page, search, type, sortBy]);

  const news = data?.news || [];

  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <PageContainer>

        {/** News */}
        <div className='max-w-7xl space-y-8 w-full items-start mb-12'>
          <div className='w-full items-start flex flex-col gap-8'>
            {/* Grid de Posts */}
            {loading && (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
                {Array.from({ length: limit }).map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))}
              </div>
            )}
            {error && (
              <div className='text-center py-12'>
                <p className='text-red-amber-torque'>Erro ao carregar notícias: {error}</p>
              </div>
            )}
            {!loading && !error && news.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-gray-500'>Nenhuma notícia encontrada.</p>
              </div>
            )}
            {!loading && !error && news.length > 0 && (
              <div>
                {/* Layout de destaque apenas na primeira página 
                {page === 1 && news.length >= 1 && (
                    <BlogCardFeatured news={news[0]} size="large" />
                )*/}
                {/* Cards normais */}
                {page === 1 && news.length > 0 && (
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {news.map((item) => (
                      <BlogCard key={item.id} news={item} />
                    ))}
                  </div>
                )}
                {/* Páginas subsequentes - layout normal */}
                {page > 1 && (
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {news.map(item => (
                      <BlogCard key={item.id} news={item} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Paginação */}
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 0}
            onPageChange={setPage}
            disabled={loading}
          />
        </div>

        {/** Events */}
        <div className='max-w-7xl space-y-8 w-full'>

          <div className='flex flex-col items-start gap-3'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-start md:text-start max-w-3xl leading-tight">
              Eventos
            </h1>
          </div>

          {eventsLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {Array.from({ length: 3 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <EventsCarousel events={events} />
          )}

          {/* Próximos Eventos - só mostra se tiver eventos ou estiver carregando */}
          {(upcomingEventsLoading || upcomingEvents.length > 0) && (
            <>
              {/* Divisor - Próximos Eventos */}
              <div className='flex items-center gap-4 pt-8'>
                <span className='uppercase font-semibold text-lg text-blue-ignition'>Próximos Eventos</span>
                <div className='flex-grow border-t border-blue-ignition'></div>
              </div>

              {/* Carousel de Próximos Eventos */}
              {upcomingEventsLoading ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <NextEventCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <NextEventsCarousel events={upcomingEvents} />
              )}
            </>
          )}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
