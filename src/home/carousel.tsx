//criar componente de carrousel
//o carrousel tera varias imagens cada uma redirecionando para um link direferente
//exceto a primeira imagem, que sera public\imgs\carrousel-home\carrousel-home-1.png e tera um texto e botoes por cima dela
//na primeira imagem, o tezto sera A maior empresa de válvulas injetoras do Brasil, sedo que válvulas injetoras destacadas em vermelho
//logo abaixo do texto dois botes, um azul escrito Veja nossos Produtos e outro outlined escrito Baixe nosso Catálogo com icon de baixar
//crie o componente de botao separado dai, com variantes, podendo ou nao receber icon, em src\shared\button.tsx
//o carrousel tambem tera os pontos para passar de imagem, cada um com um circulo, e quando clicado, passara para a imagem correspondente, tanto em telas menores quanto maiores
//nas telas menores, vai sumir os botoes e vai ficar apenas o texto, e a imagem deve mudar para public\imgs\carrousel-home\carrousel-home-mobile-1.png
//todas as imagens vao ter a mesma altura e largura e o carrousel deve ter a mesma altura e largura que as imagens
//alem disso, cada imagem vai ter a versao grande e mobile e vai se chamar carrousel-home-1.png e carrousel-home-mobile-1.png respectivamente

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

  //criar array com as imagens do carroussel aqui e renderizar um slide para cada uma delas, para tamanho mobile e normal
  const carouselImages = [
    {
      id: 2,
      image: CarrouselHome2,
      imageMobile: CarrouselHome2Mobile,
    },
  ]

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {/* Slide 1 */}
        <div className="w-full flex-shrink-0 relative">
          <Image
            src={CarrouselHome1}
            alt="Carousel Image 1"
            className="w-full hidden md:flex h-[500px]"
          />
          <Image
            src={CarrouselHome1Mobile}
            alt="Carousel Image 1"
            className="w-full flex md:hidden"
          />
          <div className="absolute inset-0 flex gap-4 flex-col items-start justify-center text-start text-white px-4 md:px-40">
            <div className='flex flex-col gap-2 items-start'>
              <Image src={Arrow} alt="Arrow" className="h-4 md:h-6 w-auto" />
              {/* Text for larger screens */}
              <h1 className="hidden md:block text-6xl font-medium">
                A maior empresa de <br /> <span className="text-red-500">válvulas injetoras</span> do <br /> Brasil
              </h1>
              {/* Text for smaller screens */}
              <h1 className="md:hidden text-5xl font-medium">
                A maior empresa de <span className="text-red-500">válvulas injetoras</span> do Brasil
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
      <div className="absolute bottom-40 md:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button key={index} onClick={() => scrollTo(index)} className="p-0 bg-transparent border-none">
            <div
              className={`w-2 h-2 rounded-full cursor-pointer transition duration-300 ${index === selectedIndex ? 'bg-red-500 w-6' : 'bg-gray-oxide-steel'
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