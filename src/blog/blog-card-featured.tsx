"use client";

import Image from 'next/image';
import Link from 'next/link';
import { NewsListItem } from '@/shared/types/blog-types';
import SectionTagName from '@/shared/section-tag-name';

interface BlogCardFeaturedProps {
  news: NewsListItem;
  size?: 'large' | 'small';
}

export function BlogCardFeatured({ news, size = 'large' }: BlogCardFeaturedProps) {
  const isLarge = size === 'large';

  return (
    <Link href={`/blog/${news.slug}`} className="block h-full group">
      <div className="w-full overflow-hidden rounded-xl">
        {news.imagePath ? (
          <Image
            src={news.imagePath}
            alt={news.title}
            width={800}
            height={500}
            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full bg-gray-300 ${isLarge ? 'h-[500px]' : 'h-[240px]'}`} />
        )}
      </div>

      <div className={`space-y-3 ${isLarge ? 'pt-5' : 'pt-3'}`}>
        <SectionTagName text="notícias" />

        <h3 className={`font-medium ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
          {news.title}
        </h3>
      </div>
    </Link>
  );
}
