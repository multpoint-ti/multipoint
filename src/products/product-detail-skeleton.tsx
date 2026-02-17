export function ProductDetailSkeleton() {
  return (
    <div className='flex flex-col gap-2 w-full min-w-0 overflow-x-hidden animate-pulse'>
      {/* Breadcrumb Skeleton */}
      <div className='flex items-center gap-2 py-4'>
        <div className='h-4 bg-gray-200 rounded w-20'></div>
        <div className='h-4 w-4 bg-gray-200 rounded'></div>
        <div className='h-4 bg-gray-200 rounded w-32'></div>
        <div className='h-4 w-4 bg-gray-200 rounded'></div>
        <div className='h-4 bg-gray-200 rounded w-40'></div>
      </div>

      {/* Divisor */}
      <div className="border-t border-gray-200 my-2"></div>

      {/* Conteúdo Principal */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8'>
        {/* Coluna Esquerda - ImageViewer Skeleton */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Miniaturas - Row no mobile, Column no desktop */}
          <div className="flex flex-row md:flex-col gap-2">
            <div className='w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg'></div>
            <div className='w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg'></div>
            <div className='w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg'></div>
          </div>

          {/* Imagem Principal */}
          <div className='flex-1 aspect-square bg-gray-200 rounded-lg'></div>
        </div>

        {/* Coluna Direita - Informações Skeleton */}
        <div className='flex flex-col gap-6'>
          {/* Título */}
          <div className='space-y-3'>
            <div className='h-8 md:h-12 bg-gray-200 rounded w-3/4'></div>
            <div className='h-8 md:h-12 bg-gray-200 rounded w-1/2'></div>
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

      {/* Divisor */}
      <div className="border-t border-gray-200 mt-10 lg:mt-20 mb-4"></div>

      {/* Seção Mais Informações Skeleton */}
      <div>
        <div className='flex items-center gap-2 mb-4'>
          <div className='w-5 h-5 bg-gray-200 rounded'></div>
          <div className='h-6 bg-gray-200 rounded w-52'></div>
        </div>
        <div className='space-y-4 px-8'>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
        </div>
      </div>

      {/* Divisor */}
      <div className="border-t border-gray-200 mt-12 mb-8"></div>

      {/* Seção Recomendações Skeleton */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-4'>
          <div className='h-6 bg-gray-200 rounded w-40'></div>
          <div className='flex gap-2'>
            <div className='w-6 h-6 bg-gray-200 rounded'></div>
            <div className='w-6 h-6 bg-gray-200 rounded'></div>
          </div>
        </div>
        <div className='flex gap-4 md:gap-6 lg:gap-16'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='flex-[0_0_140px] md:flex-[0_0_180px] lg:flex-[0_0_200px] flex flex-col items-center'>
              <div className='rounded-lg p-4 aspect-square w-full bg-gray-200'></div>
              <div className='mt-4 w-full h-6 bg-gray-200 rounded'></div>
              <div className='mt-3 h-4 bg-gray-200 rounded w-20'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
