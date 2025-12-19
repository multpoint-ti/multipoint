'use client';

import { useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface GalleryImage {
  id: string;
  path: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export function ImageGallery({ images, title = 'Galeria' }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const breakpointColumns = {
    default: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = images.map((image) => ({
    src: image.path,
  }));

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="mb-4 overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="relative">
              <Image
                src={image.path}
                alt={`Imagem ${index + 1} da galeria`}
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </div>
        ))}
      </Masonry>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </div>
  );
}
