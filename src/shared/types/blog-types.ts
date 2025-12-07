export type NewsType = 'EVENTO' | 'NOTICIA';

export type GalleryImage = {
  id: string;
  path: string;
};

export type News = {
  id: string;
  slug: string;
  title: string;
  text: string;
  type: NewsType;
  createdAt: string;
  updatedAt: string;
  imagePath: string;
  videoPath?: string;
  galleryImagesPaths: GalleryImage[];
};

// Tipo para listagem (sem galeria)
export type NewsListItem = Omit<News, 'galleryImagesPaths' | 'videoPath'>;
