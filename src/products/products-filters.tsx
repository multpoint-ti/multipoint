"use client";

import Image from 'next/image';
import Arrow from '../../public/imgs/arrow.svg'

interface ProductsFiltersProps {
  onSearchChange: (search: string) => void;
  onProductLineChange: (line: string) => void;
  onAutomakerChange: (automaker: string) => void;
  onModelChange: (model: string) => void;
  onYearChange: (year: string) => void;
}

export function ProductsFilters({
  onSearchChange,
  onProductLineChange,
  onAutomakerChange,
  onModelChange,
  onYearChange
}: ProductsFiltersProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Flecha decorativa e título */}
      <div className="flex flex-col gap-2">
        <Image src={Arrow} alt="Arrow" className="h-4" />
        <h1 className="text-4xl md:text-5xl font-medium text-start md:text-start max-w-3xl leading-tight">
          Produtos
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Pesquisa Avançada */}
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-lg font-medium ">Pesquisa Avançada</h3>
            <p className="text-xs text-gray-400">
              Busque o produto com o Código MultiPoint ou com o Código Original da peça
            </p>
          </div>
          <input
            type="text"
            placeholder="Digite o código"
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium ">Filtros</h3>
          <div className="flex flex-col gap-4">

            {/* Linha de Produto */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium ">Linha de Produto</label>
              <select
                className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white"
                onChange={(e) => onProductLineChange(e.target.value)}
                defaultValue=""
              >
                <option value="">Todas</option>
                <option value="VALVULAS_INJETORAS">Válvulas Injetoras</option>
                <option value="BOMBAS">Bombas</option>
                <option value="SENSORES">Sensores</option>
                <option value="ATUADORES">Atuadores</option>
              </select>
            </div>

            {/* Montadoras */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium ">Montadoras</label>
              <select
                className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white"
                onChange={(e) => onAutomakerChange(e.target.value)}
                defaultValue=""
              >
                <option value="">Todas</option>
                <option value="FIAT">Fiat</option>
                <option value="VOLKSWAGEN">Volkswagen</option>
                <option value="FORD">Ford</option>
                <option value="CHEVROLET">Chevrolet</option>
                <option value="RENAULT">Renault</option>
              </select>
            </div>

            {/* Modelos */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium ">Modelos</label>
              <select
                className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white"
                onChange={(e) => onModelChange(e.target.value)}
                defaultValue=""
              >
                <option value="">Todos</option>
              </select>
            </div>

            {/* Ano */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium ">Ano</label>
              <select
                className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white"
                onChange={(e) => onYearChange(e.target.value)}
                defaultValue=""
              >
                <option value="">Todos</option>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
