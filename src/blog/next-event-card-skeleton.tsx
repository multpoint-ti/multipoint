"use client";

export function NextEventCardSkeleton() {
  return (
    <div className="bg-gray-200 rounded-3xl overflow-hidden flex flex-col px-6 py-8 gap-6 h-full animate-pulse">
      {/* Header com tag e ano */}
      <div className="flex justify-between items-center">
        <div className="h-5 w-16 bg-gray-100 rounded"></div>
        <div className="h-4 w-10 bg-gray-100 rounded"></div>
      </div>

      {/* Título do Evento */}
      <div className="flex-grow space-y-2">
        <div className="h-6 bg-gray-100 rounded w-full"></div>
        <div className="h-6 bg-gray-100 rounded w-2/3"></div>
        <div className="h-4 bg-gray-100 rounded w-24 mt-4"></div>
      </div>

      {/* Botão Saber Mais */}
      <div className="h-10 w-28 bg-gray-100 rounded-full"></div>
    </div>
  );
}
