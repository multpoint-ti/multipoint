'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/shared/button';

interface CategoryItem {
  title: string;
  image: string;
  href: string;
}

const categories: CategoryItem[] = [
  {
    title: 'PRODUTOS',
    image: '/imgs/radiador.webp',
    href: '/produtos',
  },
  {
    title: 'NOTÍCIAS',
    image: '/imgs/carro-examinando-mechanic.avif',
    href: '/blog',
  },
  {
    title: 'EVENTOS',
    image: '/imgs/news/automec-2025/automec-2025.jpg',
    href: '/blog',
  },
];

function CategoryCard({ item }: { item: CategoryItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={item.href} className="block">
      <div
        className="relative flex flex-col cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative h-80 md:h-[400px] xl:h-[600px] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
          {/* Blue overlay on hover */}
          <div
            className={`absolute inset-0 bg-blue-gravel-mist/40 transition-opacity duration-300 flex items-center justify-center ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button variant="white" className="pointer-events-none">
              Saiba Mais
            </Button>
          </div>
        </div>

        {/* Text container with vertical line */}
        <div className="relative bg-blue-ignition py-6 px-4">
          {/* Vertical decorative line */}
          <div className="absolute left-8 -top-10 w-1 h-26 bg-red-amber-torque" />

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-semibold text-white pl-8 pt-2 pb-6 hover:underline">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export function CategoriesSection() {
  const [isMobile, setIsMobile] = useState(false);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop: 3 columns grid
  if (!isMobile) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 lg:pt-12 pb-20">
        <div className="grid grid-cols-3">
          {categories.map((item) => (
            <CategoryCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    );
  }

  // Mobile: Auto-sliding carousel
  return (
    <section className="w-full lg:py-12 pb-16 lg:pb-0">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {categories.map((item) => (
            <div key={item.title} className="flex-[0_0_85%] min-w-0 px-2">
              <CategoryCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
