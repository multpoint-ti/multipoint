"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/shared/types/product-types';

interface ProductCardProps {
  product: Product;
}

export function getProductLineName(productLine: string, code: string): string {
  const productLineNames: { [key: string]: string } = {
    'VALVULAS_INJETORAS': 'Válvula Injetora',
    'KITS_PARA_BICO_INJETOR': 'Kit para Bico Injetor',
    'OUTROS': 'Produto',
  };

  const name = productLineNames[productLine] || productLine;
  return `${name} ${code}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const productName = getProductLineName(product.productLine, product.multpointCode);
  const automakers = product.automakers.map(a => a.name).join(', ');

  return (
    <Link href={`/produtos/${product.id}`} className="h-full">
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col py-4 hover:cursor-pointer hover:border-gray-400 transition-all duration-300 h-full">
        {/* Imagem do Produto */}
        <div className="relative w-full h-54 flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].path}
              alt={productName}
              width={200}
              height={200}
              className="object-contain w-full h-full p-4"
            />
          ) : (
            <div className="text-gray-400 text-sm">Sem imagem</div>
          )}
        </div>

        {/* Conteúdo do Card */}
        <div className="p-4 flex flex-col gap-3">
          {/* Nome do Produto */}
          <h3 className="text-lg font-normal uppercase line-clamp-2 text-center flex-grow">
            {productName}
          </h3>

          {/* Divisor */}
          <div className="border-t border-gray-200"></div>

          {/* Código MultPoint e Montadoras */}
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-start gap-1 text-red-amber-torque">
              <span className="whitespace-nowrap">Código MultPoint:</span>
              <span className="">{product.multpointCode}</span>
            </div>
            {automakers && (
              <div className="flex items-start gap-1">
                <span className="whitespace-nowrap">Montadoras:</span>
                <span className="line-clamp-2">{automakers}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
