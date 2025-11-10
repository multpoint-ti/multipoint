export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col animate-pulse">
      {/* Skeleton da Imagem */}
      <div className="relative w-full h-48 bg-gray-200"></div>

      {/* Skeleton do Conteúdo */}
      <div className="p-4 flex flex-col gap-3">
        {/* Skeleton do Nome do Produto */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-200"></div>

        {/* Skeleton do Código e Montadoras */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
