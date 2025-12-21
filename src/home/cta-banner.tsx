'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { Button } from '@/shared/button';
import CarrouselHome1 from '../../public/imgs/man-close-with-lamp.png';
import CarrouselHome1Mobile from '../../public/imgs/mobile-man-close-with-lamp.png';
import Arrow from '../../public/imgs/arrow.svg';

export function CtaBanner() {
  return (
    <section className="w-full relative mt-12 lg:mt-20">
      {/* Desktop Image */}
      <Image
        src={CarrouselHome1}
        alt="Banner"
        className="w-full hidden md:block h-[500px] object-cover"
      />
      {/* Mobile Image */}
      <Image
        src={CarrouselHome1Mobile}
        alt="Banner"
        className="w-full block md:hidden"
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex gap-4 flex-col items-start justify-start pt-16 md:pt-0 md:justify-center text-start text-white px-8 md:px-40 max-w-[1500px] mx-auto">
        <div className="flex flex-col gap-2 items-start">
          <Image src={Arrow} alt="Arrow" className="h-4 md:h-6 w-auto" />
          {/* Text for larger screens */}
          <h2 className="hidden md:block text-5xl font-medium leading-tight">
            Siga as nossas <br /> <span className="text-red-amber-torque"> redes sociais</span>
          </h2>
          {/* Text for smaller screens */}
          <h2 className="md:hidden text-4xl font-medium leading-tight">
            Siga as nossas <span className="text-red-amber-torque"><br />redes sociais</span>
          </h2>
        </div>

        {/* Social buttons - always visible */}
        <div className="mt-4 flex gap-4 flex-row">
          <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <Button variant="default" className="gap-2">
              <Facebook className="h-5 w-5" />
              Facebook
            </Button>
          </Link>
          <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <Button variant="white" className="gap-2">
              <Instagram className="h-5 w-5" />
              Instagram
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
