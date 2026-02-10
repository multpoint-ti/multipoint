'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/shared/types/product-types';
import { Menu } from '@/shared/menu';
import { Footer } from '@/shared/footer';
import PageContainer from '@/shared/page-container';
import { Breadcrumb } from '@/shared/breadcrumb';
import { ImageViewer } from './image-viewer';
import { ProductAccordion } from './product-accordion';
import { getProductLineName } from './product-card';
import { Button } from '@/shared/button';
import { ArrowRight, Download, Info } from 'lucide-react';
import { ProductDetailSkeleton } from './product-detail-skeleton';
import { ProductRecommendations } from './product-recommendations';
import Link from 'next/link';
import SectionTagName from '@/shared/section-tag-name';

const handleDownloadCatalog = () => {
  const link = document.createElement('a');
  link.href = '/data/MP_CATALOGO_2025.pdf';
  link.download = 'MP_CATALOGO_2025.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetailComponent({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      fetch(`/api/products/${productId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Produto não encontrado');
          }
          return response.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className='flex flex-col items-center w-full'>
        <Menu />
        <PageContainer>
          <ProductDetailSkeleton />
        </PageContainer>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className='flex flex-col items-center w-full'>
        <Menu />
        <PageContainer>
          <div className='py-12 text-center'>
            <p className='text-red-amber-torque'>Erro ao carregar produto: {error}</p>
          </div>
        </PageContainer>
        <Footer />
      </div>
    );
  }

  const productName = getProductLineName(product.productLine, product.multpointCode);
  const productLineLabels: { [key: string]: string } = {
    'VALVULAS_INJETORAS': 'Válvulas Injetoras',
    'KITS_PARA_BICO_INJETOR': 'Kits para Bico Injetor',
    'GUARNICOES': 'Guarnições',
    'CONECTORES_E_TRAVAS': 'Conectores e Travas',
    'DELPHI': 'Delphi',
    'OUTROS': 'Outros',
  };
  const productLineLabel = productLineLabels[product.productLine] || product.productLine;

  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />

      <PageContainer>
        <div className='flex flex-col gap-2 w-full min-w-0 overflow-x-hidden'>
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Produtos', href: '/produtos' },
              { label: productLineLabel, href: `/produtos?productLine=${product.productLine}` },
              { label: productName },
            ]}
          />

          {/* Divisor */}
          <div className="border-t border-gray-200 my-2"></div>

          {/* Conteúdo Principal */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8'>
            {/* Coluna Esquerda - Imagens */}
            <div>
              <ImageViewer images={product.images} alt={productName} />
            </div>

            {/* Coluna Direita - Informações */}
            <div className='flex flex-col gap-6'>
              {/* Nome do Produto */}
              <div>
                <h1 className='text-3xl md:text-5xl font-medium uppercase'>
                  {productName}
                </h1>
              </div>

              {/* Accordions */}
              <ProductAccordion
                automakerCode={product.automakerCode}
                multpointCode={product.multpointCode}
                shortCode={product.shortCode}
                details={product.details}
                vehiculesApplication={product.vehiculesApplication}
              />

              {/* Botões */}
              <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                <Link href={`/representantes`}>
                  <Button variant='default' className='flex items-center gap-2 text-white'>
                    Encontre um representante
                    <ArrowRight className='w-4 h-4' />
                  </Button>
                </Link>
                <Button variant='outline' className='flex items-center gap-2' onClick={handleDownloadCatalog}>
                  <Download className='w-4 h-4' />
                  Baixe nosso catálogo
                </Button>
              </div>
            </div>
          </div>

          {/* Divisor */}
          <div className="border-t border-gray-200 mt-20 mb-4 "></div>

          {/* Seção Mais Informações */}
          <div className=''>
            <div className='flex items-center gap-2 mb-4'>
              <Info className='w-5 h-5' />
              <h2 className='text-xl font-medium uppercase'>MAIS INFORMAÇÕES</h2>
            </div>
            <div className='space-y-4 px-8'>
              <p>
                Cada válvula injetora que fabricamos passa por um rigoroso processo de controle
                de qualidade, desde a seleção de matérias-primas até a finalização do produto;
                garantindo que cada etapa seja realizada com precisão e atenção aos detalhes.
              </p>
              <p>
                Investimos em tecnologia de ponta e na capacitação contínua de nossa equipe,
                assegurando que nossos produtos sejam não apenas eficientes, mas também
                duráveis e confiáveis.
              </p>
            </div>
          </div>

          {/* Divisor */}
          <div className="border-t border-gray-200 mt-12 mb-8"></div>

          {/* Seção Recomendações */}
          <div className='mb-8'>
            <ProductRecommendations
              currentProductId={product.id}
              productLine={product.productLine}
            />
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
