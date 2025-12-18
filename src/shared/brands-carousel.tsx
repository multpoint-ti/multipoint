"use client";

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const brands = [
    { name: 'Bosch', src: '/imgs/brands/bosch.png' },
    { name: 'Chevrolet', src: '/imgs/brands/chevrolet.png' },
    { name: 'Citroen', src: '/imgs/brands/citroen.png' },
    { name: 'Delphi', src: '/imgs/brands/delphi.png' },
    { name: 'Fiat', src: '/imgs/brands/fiat.png' },
    { name: 'Ford', src: '/imgs/brands/ford.png' },
    { name: 'Hyundai', src: '/imgs/brands/hyundai.png' },
    { name: 'Magneti Marelli', src: '/imgs/brands/magneti marelli.png' },
    { name: 'Nissan', src: '/imgs/brands/nissan.png' },
    { name: 'Peugeot', src: '/imgs/brands/peugeot.png' },
    { name: 'Renault', src: '/imgs/brands/renault.png' },
    { name: 'Volkswagen', src: '/imgs/brands/volkswagen.png' },
];

export default function BrandsCarousel() {
    return (
        <div className="w-full flex flex-col items-center gap-8 pb-8">
            <div className='w-full flex flex-col items-center'>
                <h3 className='uppercase font-medium text-xs md:text-sm'>Trabalhamos com peças de reposição de MONTADORAS como:</h3>
                <span className='block w-36 h-0.5 mt-[2px] bg-blue-gravel-mist'></span>
            </div>
            <Marquee speed={40} gradient={false} pauseOnHover>
                {brands.map((brand) => (
                    <div key={brand.name} className="mx-8 flex items-center justify-center">
                        <Image
                            src={brand.src}
                            alt={brand.name}
                            width={120}
                            height={60}
                            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
}
