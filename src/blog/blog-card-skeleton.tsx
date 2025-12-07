export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col animate-pulse w-full">
      {/* Skeleton da Imagem */}
      <div className="relative w-full h-64 bg-gray-200"></div>

      {/* Skeleton do Conteúdo */}
      <div className="py-4 flex flex-col gap-3">
        {/* Skeleton do Tipo (Evento ou Notícia) */}
        <div className="h-4 bg-gray-200 rounded w-16"></div>

        {/* Skeleton do Título */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>

        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}
