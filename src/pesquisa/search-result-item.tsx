'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

interface SearchResult {
  type: 'product' | 'news' | 'event';
  id: string;
  slug: string;
  title: string;
  imagePath: string | null;
}

interface SearchResultItemProps {
  result: SearchResult;
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'product':
      return 'Produto';
    case 'news':
      return 'Notícia';
    case 'event':
      return 'Evento';
    default:
      return '';
  }
}

function getTypeListingLink(type: string): string {
  switch (type) {
    case 'product':
      return '/produtos';
    case 'news':
    case 'event':
      return '/blog';
    default:
      return '/';
  }
}

function getDetailLink(result: SearchResult): string {
  switch (result.type) {
    case 'product':
      return `/produtos/${result.slug}`;
    case 'news':
      return `/blog/${result.slug}`;
    case 'event':
      return `/eventos/${result.slug}`;
    default:
      return '/';
  }
}

export function SearchResultItem({ result }: SearchResultItemProps) {
  const detailLink = getDetailLink(result);

  return (
    <div className="py-4">
      <div className="flex gap-4 items-start">
        {/* Image */}
        <Link href={detailLink} className="flex-shrink-0">
          <div className="w-24 h-24 relative bg-gray-100 rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
            {result.imagePath ? (
              <Image
                src={result.imagePath}
                alt={result.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Search className="w-6 h-6" />
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-grow">
          {/* Title */}
          <Link href={detailLink} className="hover:underline">
            <h4 className="text-lg font-medium text-blue-ignition line-clamp-2">
              {result.title}
            </h4>
          </Link>

          {/* Type link */}
          <Link
            href={getTypeListingLink(result.type)}
            className="text-sm text-gray-500 hover:text-blue-gravel-mist hover:underline w-fit"
          >
            {getTypeLabel(result.type)}
          </Link>

          {/* Read more */}
          <Link
            href={detailLink}
            className="flex gap-1 items-center text-sm hover:underline w-fit"
          >
            <ArrowRight className="w-4 h-4 text-red-amber-torque" />
            <span>Leia mais</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
