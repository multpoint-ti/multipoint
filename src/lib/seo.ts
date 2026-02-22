import { Metadata } from 'next';
import { Product } from '@/shared/types/product-types';
import { News } from '@/shared/types/blog-types';
import { Event } from '@/shared/types/event-types';

// Configuração base do site
export const siteConfig = {
  name: 'MultPoint Indústria',
  description: 'Referência nacional na fabricação de válvulas injetoras para reposição automotiva. Empresa 100% brasileira com performance equiparada à original.',
  url: 'https://multpoint.com',
  ogImage: '/imgs/og-image.jpg',
  locale: 'pt_BR',
  twitter: '@multpoint',
};

// Metadata base para todas as páginas
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'válvulas injetoras',
    'bico injetor',
    'kits para bico injetor',
    'peças automotivas',
    'injeção eletrônica',
    'multpoint',
    'autopeças',
    'reposição automotiva',
    'válvulas injetoras reposição',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Adicione suas verificações aqui quando tiver
    // google: 'seu-codigo-google',
    // yandex: 'seu-codigo-yandex',
  },
};

// Função para formatar linha de produto
function formatProductLine(productLine: string): string {
  const lineNames: Record<string, string> = {
    'VALVULAS_INJETORAS': 'Válvulas Injetoras',
    'KITS_PARA_BICO_INJETOR': 'Kits para Bico Injetor',
    'GUARNICOES': 'Guarnições',
    'CONECTORES_E_TRAVAS': 'Conectores e Travas',
    'DELPHI': 'Delphi',
    'OUTROS': 'Outros',
  };
  return lineNames[productLine] || productLine;
}

// Gerar metadata para produto
export function generateProductMetadata(product: Product): Metadata {
  const title = `${product.multpointCode} - ${formatProductLine(product.productLine)}`;
  const automakers = product.automakers.map(a => a.name).join(', ');
  const description = product.details
    ? product.details.substring(0, 160)
    : `${formatProductLine(product.productLine)} código ${product.multpointCode}. Compatível com: ${automakers}. Anos: ${product.years.join(', ')}.`;

  const imageUrl = product.images[0]?.path || siteConfig.ogImage;
  const canonicalUrl = `${siteConfig.url}/produtos/${product.id}`;

  return {
    title,
    description,
    keywords: [
      product.multpointCode,
      product.shortCode,
      ...product.automakerCode,
      ...product.automakers.map(a => a.name),
      formatProductLine(product.productLine),
      ...product.categories,
      'peças automotivas',
      'multpoint',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Gerar metadata para notícia/blog
export function generateNewsMetadata(news: News): Metadata {
  const title = news.title;
  const description = news.text.replace(/<[^>]*>/g, '').substring(0, 160);
  const imageUrl = news.imagePath || siteConfig.ogImage;
  const canonicalUrl = `${siteConfig.url}/blog/${news.slug}`;
  const isEvent = news.type === 'EVENTO';

  return {
    title,
    description,
    keywords: [
      isEvent ? 'evento' : 'notícia',
      'multpoint',
      'automotivo',
      'injeção eletrônica',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
      publishedTime: news.createdAt,
      modifiedTime: news.updatedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Gerar metadata para evento
export function generateEventMetadata(event: Event): Metadata {
  const title = event.name;
  const description = `${event.name} - ${formatEventDate(event.date)} em ${event.local}. ${event.text.replace(/<[^>]*>/g, '').substring(0, 100)}`;
  const imageUrl = event.imagePath || siteConfig.ogImage;
  const canonicalUrl = `${siteConfig.url}/eventos/${event.slug}`;

  const eventTypeNames: Record<string, string> = {
    'FEIRA': 'Feira',
    'WORKSHOP': 'Workshop',
    'PALESTRA': 'Palestra',
    'OUTRO': 'Evento',
  };

  return {
    title,
    description,
    keywords: [
      eventTypeNames[event.type] || 'evento',
      'multpoint',
      'evento automotivo',
      event.local,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
      publishedTime: event.createdAt,
      modifiedTime: event.updatedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Formatar data do evento
function formatEventDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// JSON-LD para produto
export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.multpointCode} - ${formatProductLine(product.productLine)}`,
    description: product.details || `${formatProductLine(product.productLine)} código ${product.multpointCode}`,
    sku: product.multpointCode,
    mpn: product.shortCode,
    image: product.images.map(img => img.path),
    brand: {
      '@type': 'Brand',
      name: 'MultPoint',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'MultPoint Indústria',
    },
    category: formatProductLine(product.productLine),
    isRelatedTo: product.automakers.map(automaker => ({
      '@type': 'Brand',
      name: automaker.name,
    })),
  };
}

// JSON-LD para notícia/artigo
export function generateNewsJsonLd(news: News) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: news.title,
    description: news.text.replace(/<[^>]*>/g, '').substring(0, 160),
    image: news.imagePath,
    datePublished: news.createdAt,
    dateModified: news.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'MultPoint Indústria',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MultPoint Indústria',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/imgs/logo.png`,
      },
    },
  };
}

// JSON-LD para evento
export function generateEventJsonLd(event: Event) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.text.replace(/<[^>]*>/g, '').substring(0, 160),
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.local,
    },
    image: event.imagePath,
    organizer: {
      '@type': 'Organization',
      name: 'MultPoint Indústria',
    },
  };
}

// JSON-LD para organização (página principal)
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MultPoint Indústria',
    url: siteConfig.url,
    logo: `${siteConfig.url}/imgs/logo.png`,
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    sameAs: [
      // Adicione suas redes sociais aqui
    ],
  };
}