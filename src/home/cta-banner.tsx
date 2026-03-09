'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { Button } from '@/shared/button';
import SocialMedia from '../../public/imgs/socialMedia.svg';
import SocialMediaMobile from '../../public/imgs/socialMedia-mobile.svg';

export function CtaBanner() {
  return (
    <section className="w-full flex flex-col md:flex-row mt-6 lg:mt-26 md:max-h-96">
      <Image
        src={SocialMediaMobile}
        alt="Redes Sociais"
        className="w-full h-auto block md:hidden"
      />

      {/* Left side - bg extends full width */}
      <div className="bg-gray-oxide-steel md:w-1/2 flex justify-end">
        <div className="flex flex-col gap-4 justify-center items-center md:items-start text-center md:text-start text-blue-ignition px-8 py-12 w-full max-w-[640px]">
          <h2 className="max-w-2xl text-3xl md:text-5xl font-medium leading-tight">
            Siga as nossas <br /> redes sociais
          </h2>

          <div className="mt-4 flex gap-4 flex-row">
            <Link href="https://web.facebook.com/MPValvulasInjetoras/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2 bg-blue-ignition text-white">
                <Facebook className="h-5 w-5" />
                Facebook
              </Button>
            </Link>
            <Link href="https://www.instagram.com/multpoint/" target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2 bg-blue-ignition text-white">
                <Instagram className="h-5 w-5" />
                Instagram
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - bg extends full width */}
      <div className="bg-blue-ignition md:w-1/2 flex justify-start">
        <div className="w-full max-w-[640px] flex items-center justify-center md:justify-start">
          <Image
            src={SocialMedia}
            alt="Redes Sociais"
            className="w-auto h-full hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}
