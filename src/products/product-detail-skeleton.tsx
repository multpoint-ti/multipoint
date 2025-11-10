export function ProductDetailSkeleton() {
  return (
    <div className='py-8 animate-pulse'>
      {/* Breadcrumb Skeleton */}
      <div className='flex items-center gap-2 py-4'>
        <div className='h-4 bg-gray-200 rounded w-20'></div>
        <div className='h-4 w-4 bg-gray-200 rounded'></div>
        <div className='h-4 bg-gray-200 rounded w-32'></div>
        <div className='h-4 w-4 bg-gray-200 rounded'></div>
        <div className='h-4 bg-gray-200 rounded w-40'></div>
      </div>

      {/* Conteúdo Principal */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8'>
        {/* Coluna Esquerda - Imagem Skeleton */}
        <div className='flex gap-4'>
          {/* Miniaturas - Lado Esquerdo */}
          <div className='flex flex-col gap-2'>
            <div className='w-20 h-20 bg-gray-200 rounded-lg'></div>
            <div className='w-20 h-20 bg-gray-200 rounded-lg'></div>
            <div className='w-20 h-20 bg-gray-200 rounded-lg'></div>
          </div>

          {/* Imagem Principal - Lado Direito */}
          <div className='flex-1 aspect-square bg-gray-200 rounded-lg'></div>
        </div>

        {/* Coluna Direita - Informações Skeleton */}
        <div className='flex flex-col gap-6'>
          {/* Título */}
          <div className='space-y-3'>
            <div className='h-8 bg-gray-200 rounded w-3/4'></div>
            <div className='h-8 bg-gray-200 rounded w-1/2'></div>
          </div>

          {/* Accordions */}
          <div className='flex flex-col gap-3'>
            <div className='border border-gray-200 rounded-lg p-4'>
              <div className='h-6 bg-gray-200 rounded w-32'></div>
            </div>
            <div className='border border-gray-200 rounded-lg p-4'>
              <div className='h-6 bg-gray-200 rounded w-24'></div>
            </div>
            <div className='border border-gray-200 rounded-lg p-4'>
              <div className='h-6 bg-gray-200 rounded w-40'></div>
            </div>
          </div>

          {/* Botões */}
          <div className='flex flex-col sm:flex-row gap-4 mt-4'>
            <div className='h-10 bg-gray-200 rounded-md flex-1'></div>
            <div className='h-10 bg-gray-200 rounded-md flex-1'></div>
          </div>
        </div>
      </div>

      {/* Seção Mais Informações Skeleton */}
      <div className='mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200'>
        <div className='flex items-center gap-2 mb-4'>
          <div className='w-6 h-6 bg-gray-200 rounded'></div>
          <div className='h-7 bg-gray-200 rounded w-64'></div>
        </div>
        <div className='space-y-3'>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
        </div>
      </div>
    </div>
  );
}
