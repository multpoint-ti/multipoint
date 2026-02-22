'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';
import { Button } from '@/shared/button';

const handleDownloadCatalog = () => {
  const link = document.createElement('a');
  link.href = '/data/MP_CATALOGO_2025.pdf';
  link.download = 'MP_CATALOGO_2025.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function CatalogSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-14 lg:pb-0 pt-20">
      <div className="relative bg-blue-ignition rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch">
          {/* Image container - extends above the div */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="relative -mt-16 lg:-mt-20 w-64 h-80 lg:w-80 lg:h-96 ml-0 lg:ml-12">
              <Image
                src="/imgs/phone-catalog.png"
                alt="Catálogo MultPoint"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text container */}
          <div className="text-white w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-4 lg:pt-12 pb-16 px-6 lg:px-12 gap-4">
            <h3 className="text-3xl md:text-4xl font-semibold">
              Baixe o Catálogo
            </h3>
            <p className="text-base md:text-lg max-w-md">
              Acesse nosso catálogo completo com todos os produtos, códigos e especificações técnicas
            </p>
            <Button
              variant="white"
              className="mt-4"
              onClick={handleDownloadCatalog}
            >
              <Download className="mr-2 h-5 w-5" />
              Baixe nosso Catálogo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
