"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ImageViewerProps {
  images: {
    id: string;
    path: string;
  }[];
  alt: string;
}

export function ImageViewer({ images, alt }: ImageViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square border border-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Sem imagem disponível</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Miniaturas - Abaixo no mobile, Lado Esquerdo no desktop */}
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px]">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-t-lg border border-gray-200 border-b-3 overflow-hidden transition-all ${
              index === selectedIndex
                ? 'border-b-blue-gravel-mist'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={image.path}
              alt={`${alt} - miniatura ${index + 1}`}
              width={80}
              height={80}
              className="object-contain w-full h-full p-1"
            />
          </button>
        ))}
      </div>

      {/* Imagem Principal - Acima no mobile, Lado Direito no desktop */}
      <div className="flex-1 aspect-square rounded-lg border border-gray-200 flex items-center justify-center p-4 md:p-8">
        <Image
          src={images[selectedIndex].path}
          alt={alt}
          width={600}
          height={600}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
