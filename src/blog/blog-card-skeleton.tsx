export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col animate-pulse">
      {/* Skeleton da Imagem */}
      <div className="relative w-full h-48 bg-gray-200"></div>

      {/* Skeleton do Conteúdo */}
      <div className="p-4 flex flex-col gap-3">
        {/* Skeleton do Tipo (Evento ou Notícia) */}
        <div className="h-4 bg-gray-200 rounded w-16"></div>

        {/* Skeleton do Título */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Skeleton do Resumo */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-200"></div>

        {/* Skeleton da Data */}
        <div className="flex items-center">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}
