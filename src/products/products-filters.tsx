"use client";

interface ProductsFiltersProps {
  onSearchChange: (search: string) => void;
  onProductLineChange: (line: string) => void;
  onAutomakerChange: (automaker: string) => void;
  onModelChange: (model: string) => void;
  onYearChange: (year: string) => void;
  searchValue?: string;
  productLineValue?: string;
  automakerValue?: string;
  yearValue?: string;
}

export function ProductsFilters({
  onSearchChange,
  onProductLineChange,
  onAutomakerChange,
  onModelChange,
  onYearChange,
  searchValue = '',
  productLineValue = '',
  automakerValue = '',
  yearValue = ''
}: ProductsFiltersProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        {/* Pesquisa Avançada */}
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-lg font-medium ">Pesquisa Avançada</h3>
            <p className="text-xs text-gray-400">
              Busque o produto com o Código MultPoint ou com o Código Original da peça
            </p>
          </div>
          <input
            type="text"
            placeholder="Digite o código"
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            value={searchValue}
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
                value={productLineValue}
              >
                <option value="">Todas</option>
                <option value="VALVULAS_INJETORAS">Válvulas Injetoras</option>
                <option value="KITS_PARA_BICO_INJETOR">Kits para Bico Injetor</option>
                <option value="GUARNICOES">Guarnições</option>
                <option value="CONECTORES_E_TRAVAS">Conectores e Travas</option>
              </select>
            </div>

            {/* Montadoras */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium ">Montadoras</label>
              <select
                className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white"
                onChange={(e) => onAutomakerChange(e.target.value)}
                value={automakerValue}
              >
                <option value="">Todas</option>
                <option value="Audi">Audi</option>
                <option value="Bosch">Bosch</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Citroen">Citroen</option>
                <option value="Citroën">Citroën</option>
                <option value="Deka">Deka</option>
                <option value="Delphi">Delphi</option>
                <option value="Denso">Denso</option>
                <option value="Evoque">Evoque</option>
                <option value="Fiat">Fiat</option>
                <option value="Ford">Ford</option>
                <option value="GM">GM</option>
                <option value="Harley-Davidson">Harley-Davidson</option>
                <option value="Honda">Honda</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Magneti Marelli">Magneti Marelli</option>
                <option value="Nissan">Nissan</option>
                <option value="Peugeot">Peugeot</option>
                <option value="Range Rover">Range Rover</option>
                <option value="Renault">Renault</option>
                <option value="Rochester">Rochester</option>
                <option value="Toyota">Toyota</option>
                <option value="VW">VW</option>
                <option value="VolksWagen">VolksWagen</option>
                <option value="WV">WV</option>
              </select>
            </div>

            {/* Modelos */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium ">Modelos</label>
              <select
                className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white"
                onChange={(e) => onModelChange(e.target.value)}
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
                value={yearValue}
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
