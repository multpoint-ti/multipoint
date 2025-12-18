"use client";

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col px-6 py-8 gap-6 h-full animate-pulse">
      {/* Header com tag e ano */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
      </div>

      {/* Título do Evento */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Imagem do Evento */}
      <div className="w-full h-48 bg-gray-200 rounded-lg"></div>

      {/* Link Saber Mais */}
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
    </div>
  );
}
