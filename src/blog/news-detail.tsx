'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { News } from '@/shared/types/blog-types';
import { Menu } from '@/shared/menu';
import { Footer } from '@/shared/footer';
import PageContainer from '@/shared/page-container';
import { Breadcrumb } from '@/shared/breadcrumb';
import { ArrowLeft, Calendar } from 'lucide-react';
import { formatDate, getTypeLabel } from './blog-card';

interface NewsDetailProps {
  slug: string;
}

export default function NewsDetailComponent({ slug }: NewsDetailProps) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = () => {
      setLoading(true);
      fetch(`/api/blog/${slug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Notícia não encontrada');
          }
          return response.json();
        })
        .then(data => {
          setNews(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchNews();
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

  if (error || !news) {
    return (
      <div className='flex flex-col items-center w-full'>
        <Menu />
        <PageContainer>
          <div className='py-12 text-center'>
            <p className='text-red-600 mb-4'>Erro: {error}</p>
            <Link href='/blog' className='text-blue-600 hover:underline'>
              Voltar para o blog
            </Link>
          </div>
        </PageContainer>
        <Footer />
      </div>
    );
  }

  // Converter markdown básico em HTML
  const formatText = (text: string) => {
    return text
      .split('\n\n')
      .map((paragraph, index) => {
        // Headers
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

        // Listas
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

        // Listas numeradas
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

        // Parágrafos normais
        return (
          <p key={index} className='text-gray-700 leading-relaxed mb-4'>
            {formatInlineText(paragraph)}
          </p>
        );
      });
  };

  // Formatar texto inline (bold)
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
        <div className='flex max-w-7xl space-x-16'>

          <div className='space-y-8 w-full lg:w-3/4'>
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: 'Blog', href: '/blog' },
                { label: news.title },
              ]}
            />
            {/* Cabeçalho */}
            <div className=''>
              {/* Título */}
              <h1 className='text-3xl md:text-4xl font-bold mb-4'>
                {news.title}
              </h1>
              {/* Data */}
              <div className='flex items-center gap-2 text-gray-500 text-sm'>
                <Calendar className='w-3 h-3' />
                <span>{formatDate(news.createdAt)}</span>
              </div>
            </div>
            {/* Imagem Principal */}
            {news.imagePath && (
              <div className='relative w-full h-64 md:h-[500px] overflow-hidden'>
                <Image
                  src={news.imagePath}
                  alt={news.title}
                  fill
                  className='object-cover'
                />
              </div>
            )}
            {/* Conteúdo */}
            <article className='prose prose-lg max-w-none'>
              {formatText(news.text)}
            </article>
            {/* Galeria de Imagens */}
            {news.galleryImagesPaths && news.galleryImagesPaths.length > 0 && (
              <div className='mt-12'>
                <h3 className='text-xl font-semibold mb-4'>Galeria</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {news.galleryImagesPaths.map((image) => (
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
                className='inline-flex items-center gap-2 text-blue-600 hover:underline'
              >
                <ArrowLeft className='w-4 h-4' />
                Ver todas as notícias
              </Link>
            </div>
          </div>

          <div className='w-full lg:w-1/4'>
            <p className=''></p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
