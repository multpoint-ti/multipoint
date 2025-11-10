"use client";

import Image from 'next/image';
import CarrouselHome1 from '../../public/imgs/carrousel-home/carrousel-home-1.png'
import CarrouselHome1Mobile from '../../public/imgs/carrousel-home/carrousel-home-mobile-1.png'
import Arrow from '../../public/imgs/arrow.svg'

export function ProductsBanner() {
  return (
    <div className="overflow-hidden flex flex-col items-center w-full">
      <div className="w-full relative items-center">
        <Image
          src={CarrouselHome1}
          alt="Banner Produtos"
          className="w-full hidden md:flex h-[350px] object-cover"
        />
        <Image
          src={CarrouselHome1Mobile}
          alt="Banner Produtos"
          className="w-full flex md:hidden"
        />
        <div className="absolute inset-0 flex gap-4 flex-col items-start justify-center text-start text-white px-4 md:px-40 max-w-[1500px] mx-auto">
          <div className='flex flex-col gap-2 items-start'>
            <Image src={Arrow} alt="Arrow" className="h-4 md:h-6 w-auto" />
            {/* Text for larger screens */}
            <h1 className="hidden md:block text-6xl font-medium leading-tight">
              A maior empresa de <br /> <span className="text-red-amber-torque">válvulas injetoras</span> do Brasil
            </h1>
            {/* Text for smaller screens */}
            <h1 className="md:hidden text-[40px] font-medium leading-tight">
              A maior empresa de <span className="text-red-amber-torque">válvulas injetoras</span> do Brasil
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
