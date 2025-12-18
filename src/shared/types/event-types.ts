export type EventType = 'FEIRA' | 'WORKSHOP' | 'PALESTRA' | 'OUTRO';

export type GalleryImage = {
  id: string;
  path: string;
};

export type Event = {
  id: string;
  slug: string;
  name: string;
  date: string;
  local: string;
  text: string;
  type: EventType;
  createdAt: string;
  updatedAt: string;
  imagePath: string;
  videoPath?: string;
  galleryImagesPaths: GalleryImage[];
};

// Tipo para listagem (simplificado)
export type EventListItem = {
  id: string;
  slug: string;
  name: string;
  date: string;
  imagePath: string;
  type: EventType;
};
