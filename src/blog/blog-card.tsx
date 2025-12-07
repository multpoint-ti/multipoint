"use client";

import Image from 'next/image';
import Link from 'next/link';
import { NewsListItem } from '@/shared/types/blog-types';

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
    <Link href={`/blog/${news.slug}`} className="block">
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col hover:cursor-pointer hover:border-gray-400 transition-all duration-300">
        {/* Imagem do Post */}
        <div className="relative w-full h-48 bg-gray-200">
          {news.imagePath ? (
            <Image
              src={news.imagePath}
              alt={news.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              Sem imagem
            </div>
          )}
        </div>

        {/* Conteúdo do Card */}
        <div className="p-4 flex flex-col gap-3">
          {/* Tipo (Evento ou Notícia) */}
          <span className="text-sm text-red-amber-torque font-medium uppercase">
            {getTypeLabel(news.type)}
          </span>

          {/* Título do Post */}
          <h3 className="text-lg font-medium line-clamp-2">
            {news.title}
          </h3>

          {/* Resumo */}
          <p className="text-gray-600 text-sm line-clamp-3">
            {excerpt}
          </p>

          {/* Divisor */}
          <div className="border-t border-gray-200"></div>

          {/* Data */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
