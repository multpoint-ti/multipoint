"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold uppercase">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="py-2 px-4 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}

interface ProductAccordionProps {
  automakerCode: string[];
  multpointCode: string;
  shortCode: string;
  details: string;
  vehiculesApplication: string[];
}

export function ProductAccordion({
  automakerCode,
  multpointCode,
  shortCode,
  details,
  vehiculesApplication,
}: ProductAccordionProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Códigos */}
      <AccordionItem title="Códigos" defaultOpen={true}>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            <span className="">Código Mult Point: </span>
            <span className="">{multpointCode}</span>
          </div>
          <div>
            <span className="">Código Curto: </span>
            <span className="">{shortCode}</span>
          </div>
          {automakerCode.length > 0 && (
            <div>
              <span className="">Códigos das Montadoras: </span>
              <span className="">
                {automakerCode.join(' | ')}
              </span>
            </div>
          )}
        </div>
      </AccordionItem>

      {/* Detalhes */}
      <AccordionItem title="Detalhes">
        <p className="text-sm  whitespace-pre-line">{details}</p>
      </AccordionItem>

      {/* Aplicação por Veículo */}
      <AccordionItem title="Aplicação por Veículo">
        {vehiculesApplication.length > 0 ? (
          <ul className="space-y-1">
            {vehiculesApplication.map((vehicle, index) => (
              <li key={index} className="text-sm  flex items-start">
                <span className="mr-2">-</span>
                {vehicle}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Nenhuma aplicação específica cadastrada.</p>
        )}
      </AccordionItem>
    </div>
  );
}
