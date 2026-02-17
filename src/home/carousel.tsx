"use client";

import { Download, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/shared/button';
import CarrouselHome1 from '../../public/imgs/carrousel-home/1.svg'
import CarrouselHome2 from '../../public/imgs/carrousel-home/2.svg'
import CarrouselHome3 from '../../public/imgs/carrousel-home/3.svg'
import CarrouselHome1Mobile from '../../public/imgs/carrousel-home/1-mobile.svg'
import CarrouselHome2Mobile from '../../public/imgs/carrousel-home/2-mobile.svg'
import CarrouselHome3Mobile from '../../public/imgs/carrousel-home/3-mobile.svg'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const handleDownloadCatalog = () => {
  const link = document.createElement('a');
  link.href = '/data/MP_CATALOGO_2025.pdf';
  link.download = 'MP_CATALOGO_2025.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const carouselImages = [
  { id: 1, image: CarrouselHome1, imageMobile: CarrouselHome1Mobile, action: 'navigate' as const, href: '/produtos' },
  { id: 2, image: CarrouselHome2, imageMobile: CarrouselHome2Mobile, action: 'download' as const },
  { id: 3, image: CarrouselHome3, imageMobile: CarrouselHome3Mobile, action: 'navigate' as const, href: '/sobre-nos' },
];

export function Carousel() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideClick = () => {
    const slide = carouselImages[currentIndex];
    if (slide.action === 'download') {
      handleDownloadCatalog();
    } else if (slide.href) {
      router.push(slide.href);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="relative w-screen overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselImages.map((slide) => (
            <div key={slide.id} className="w-screen flex-shrink-0 cursor-pointer" onClick={handleSlideClick}>
              <Image
                src={slide.image}
                alt={`Carousel Image ${slide.id}`}
                className="w-screen h-auto hidden md:block"
              />
              <Image
                src={slide.imageMobile}
                alt={`Carousel Image ${slide.id}`}
                className="w-screen h-auto block md:hidden"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 items-center pt-2 pb-4 lg:mt-[-30px] lg:relative lg:z-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="p-0 bg-transparent border-none"
          >
            <div
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-red-amber-torque w-6' : 'bg-gray-400 w-2'}`}
            />
          </button>
        ))}
      </div>

      <div className="p-4 gap-2 flex md:hidden text-blue-ignition pb-6">
        <Button variant="outline" className='gap-2 border-gray-400' onClick={handleDownloadCatalog}>
          <Download className="h-5 w-5" />
          Baixar Catálogo
        </Button>
        <Button variant="outline" className='gap-2 border-gray-400'>
          <ShoppingBasket className="h-5 w-5" />
          Ver Produtos
        </Button>
      </div>
    </div>
  );
}
