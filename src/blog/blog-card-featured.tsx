"use client";

import Image from 'next/image';
import Link from 'next/link';
import { NewsListItem } from '@/shared/types/blog-types';
import SectionTagName from '@/shared/section-tag-name';
import { ArrowRight } from 'lucide-react';

interface BlogCardFeaturedProps {
  news: NewsListItem;
  size?: 'large' | 'small';
}

export function BlogCardFeatured({ news, size = 'large' }: BlogCardFeaturedProps) {
  const isLarge = size === 'large';

  return (
    <Link href={`/blog/${news.slug}`} className="block h-full">
      <div className={`relative w-full h-full overflow-hidden rounded-xl group ${isLarge ? 'min-h-[500px]' : 'min-h-[240px]'}`}>
        {/* Imagem de fundo */}
        {news.imagePath ? (
          <Image
            src={news.imagePath}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Conteúdo por cima */}
        <div className={`absolute inset-0 flex flex-col justify-end ${isLarge ? 'p-8' : 'p-5'}`}>
          <h3 className={`text-white font-medium mt-3 ${isLarge ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'}`}>
            {news.title}
          </h3>

          <div className={`flex gap-1 items-center mt-3 ${isLarge ? '' : 'mt-2'}`}>
            <ArrowRight className={`text-red-amber-torque ${isLarge ? 'w-5 h-5' : 'w-4 h-4'}`} />
            <p className={`text-white ${isLarge ? 'text-base' : 'text-sm'}`}>Ler mais</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
