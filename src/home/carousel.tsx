"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { Download, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/shared/button';
import CarrouselHome1 from '../../public/imgs/carrousel-home/carrousel-home-1.png'
import CarrouselHome1Mobile from '../../public/imgs/carrousel-home/carrousel-home-mobile-1.png'
import CarrouselHome2 from '../../public/imgs/carrousel-home/carrousel-home-2.png'
import CarrouselHome2Mobile from '../../public/imgs/carrousel-home/carrousel-home-mobile-2.png'
import Arrow from '../../public/imgs/arrow.svg'
import { useCallback, useEffect, useState } from 'react';


export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const carouselImages = [
    {
      id: 2,
      image: CarrouselHome2,
      imageMobile: CarrouselHome2Mobile,
    },
  ]

  return (
    <div className="overflow-hidden flex flex-col items-center" ref={emblaRef}>
      <div className="flex">
        {/* Slide 1 */}
        <div className="w-full flex-shrink-0 relative items-center">
          <Image
            src={CarrouselHome1}
            alt="Carousel Image 1"
            className="w-full hidden md:flex h-[500px] object-cover"
          />
          <Image
            src={CarrouselHome1Mobile}
            alt="Carousel Image 1"
            className="w-full flex md:hidden"
          />
          <div className="absolute inset-0 flex gap-4 flex-col items-start justify-center text-start text-white px-4 md:px-40 max-w-[1500px] mx-auto">
            <div className='flex flex-col gap-2 items-start'>
              <Image src={Arrow} alt="Arrow" className="h-4 md:h-6 w-auto" />
              {/* Text for larger screens */}
              <h1 className="hidden md:block text-6xl font-medium leading-tight">
                A maior empresa de <br /> <span className="text-red-amber-torque">válvulas injetoras</span> do <br /> Brasil
              </h1>
              {/* Text for smaller screens */}
              <h1 className="md:hidden text-[40px] font-medium leading-tight">
                A maior empresa de <span className="text-red-amber-torque">válvulas injetoras</span> do Brasil
              </h1>
            </div>
            <div className="mt-4 gap-4 hidden md:flex">
              <Button variant="default">Veja nossos Produtos</Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Baixe nosso Catálogo
              </Button>
            </div>
          </div>
        </div>
        {/** Other slides */}
        {carouselImages.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <Image
              src={slide.image}
              alt={`Carousel Image ${slide.id}`}
              className="w-full hidden md:flex h-[500px]"
            />
            <Image
              src={slide.imageMobile}
              alt={`Carousel Image ${slide.id}`}
              className="w-full flex md:hidden"
            />
          </div>
        ))}
      </div>

      {/* Dots for slide navigation */}
      <div className="flex gap-2 items-center pt-2 pb-4 lg:mt-[-30px] lg:relative lg:z-3">
        {scrollSnaps.map((_, index) => (
          <button key={index} onClick={() => scrollTo(index)} className="p-0 bg-transparent border-none">
            <div
              className={`w-2 h-2 rounded-full cursor-pointer transition duration-300 ${index === selectedIndex ? 'bg-red-amber-torque w-6' : 'bg-gray-400'
                }`}
            />
          </button>
        ))}
      </div>

      <div className="p-4 gap-2 flex md:hidden text-blue-ignition">
        <Button variant="outline" className='gap-2 border-gray-400'>
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