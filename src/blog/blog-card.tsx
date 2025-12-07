"use client";

import Image from 'next/image';
import Link from 'next/link';
import { NewsListItem } from '@/shared/types/blog-types';
import SectionTagName from '@/shared/section-tag-name';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  news: NewsListItem;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function getTypeLabel(type: string): string {
  return type === 'EVENTO' ? 'Evento' : 'Notícia';
}

export function BlogCard({ news }: BlogCardProps) {
  // Limitar o texto para exibição
  const excerpt = news.text.length > 150 ? news.text.substring(0, 150) + '...' : news.text;

  return (
    <Link href={`/blog/${news.slug}`} className="block h-full">
      <div className="overflow-hidden flex flex-col h-full hover:cursor-pointer">
        {/* Imagem do Post */}
        <div className="relative w-full h-64 rounded-xl bg-gray-200 flex-shrink-0">
          {news.imagePath ? (
            <Image
              src={news.imagePath}
              alt={news.title}
              fill
              className="object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Sem imagem
            </div>
          )}
        </div>

        {/* Conteúdo do Card */}
        <div className="py-4 flex flex-col gap-3 flex-grow">
          {/* Tipo (Evento ou Notícia) */}
          <SectionTagName text="notícias" />

          {/* Título do Post */}
          <h3 className="text-lg font-medium flex-grow">
            {news.title}
          </h3>

          <a href={`/blog/${news.slug}`} className='flex gap-1 items-center mt-auto'>
            <ArrowRight className="w-4 h-4 text-red-amber-torque" />
            <p className='text-sm'>Ler mais</p>
          </a>

        </div>
      </div>
    </Link>
  );
}
