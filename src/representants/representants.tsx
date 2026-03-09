"use client"

import SelectInput from '@/shared/select-input';
import { Menu } from '../shared/menu';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import PageContainer from '@/shared/page-container';

const MapBrazil = dynamic<{
    onChange?: (state: string) => void;
    width?: number;
    height?: number;
    fill?: string;
    colorStroke?: string;
    bg?: string;
    colorLabel?: string;
}>(
    () => import('react-brazil-map').then(mod => mod.MapBrazil),
    { ssr: false }
);
import { Representant, RepresentantsCard } from './representants-card';
import { Footer } from '@/shared/footer';
import representantsData from '@/data/representants.json';

export const states = [
    { value: 'ac', label: 'Acre' },
    { value: 'al', label: 'Alagoas' },
    { value: 'ap', label: 'Amapá' },
    { value: 'am', label: 'Amazonas' },
    { value: 'ba', label: 'Bahia' },
    { value: 'ce', label: 'Ceará' },
    { value: 'df', label: 'Distrito Federal' },
    { value: 'es', label: 'Espírito Santo' },
    { value: 'go', label: 'Goiás' },
    { value: 'ma', label: 'Maranhão' },
    { value: 'mt', label: 'Mato Grosso' },
    { value: 'ms', label: 'Mato Grosso do Sul' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'pa', label: 'Pará' },
    { value: 'pb', label: 'Paraíba' },
    { value: 'pr', label: 'Paraná' },
    { value: 'pe', label: 'Pernambuco' },
    { value: 'pi', label: 'Piauí' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'rn', label: 'Rio Grande do Norte' },
    { value: 'rs', label: 'Rio Grande do Sul' },
    { value: 'ro', label: 'Rondônia' },
    { value: 'rr', label: 'Roraima' },
    { value: 'sc', label: 'Santa Catarina' },
    { value: 'sp', label: 'São Paulo' },
    { value: 'se', label: 'Sergipe' },
    { value: 'to', label: 'Tocantins' },
    { value: 'all', label: 'Todos' },
];

export default function RepresentantsPageComponent() {
    states.sort((a, b) => a.label.localeCompare(b.label));

    const representants = representantsData as { [key: string]: Representant[] };

    const [selectedState, setSelectedState] = useState('all');

    const getFilteredRepresentants = (): { representant: Representant; ufs: string[] }[] => {
        const grouped = new Map<string, { representant: Representant; ufs: string[] }>();

        const entries = selectedState === 'all'
            ? Object.entries(representants)
            : [[selectedState, representants[selectedState as keyof typeof representants] || []] as [string, Representant[]]];

        for (const [uf, reps] of entries) {
            for (const rep of reps) {
                const existing = grouped.get(rep.nome);
                if (existing) {
                    existing.ufs.push(uf);
                } else {
                    grouped.set(rep.nome, { representant: rep, ufs: [uf] });
                }
            }
        }

        return Array.from(grouped.values());
    };

    const filteredRepresentants = getFilteredRepresentants();

    return (
        <div className='flex flex-col items-center w-full'>
            <Menu />
            <PageContainer>
                <div>
                    <div className='flex flex-row w-full'>
                        <div className='flex flex-col items-start w-full lg:w-1/2 gap-8'>
                            <div className='flex flex-col items-start gap-3'>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-start md:text-start max-w-3xl leading-tight">
                                    Encontre um <br /> <span className="font-bold">representante</span>
                                </h1>
                                <p className="text-base md:text-lg text-justify max-w-xl">
                                    Clique em um dos Estados destacados no mapa para acessar os dados dos nossos representantes ou utilize o filtro abaixo:
                                </p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className="text-base md:text-lg">
                                    Filtre por Estado:
                                </p>
                                <SelectInput
                                    id="state-select"
                                    options={states}
                                    onSelect={(state: string) => setSelectedState(state.toLowerCase())}
                                    value={selectedState}
                                />
                            </div>
                        </div>
                        <div className='hidden lg:flex flex-col items-start lg:w-1/2'>
                            <MapBrazil
                                onChange={(state: string) => setSelectedState(state.toLowerCase())}
                                width={700}
                                height={500}
                                fill={"#0944DB"}
                                colorStroke={"#0944DB"}
                                bg={"#D9D9DF"}
                                colorLabel={"#D9D9DF"}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-4'>
                        {filteredRepresentants.length > 0 ? (
                            filteredRepresentants.map((item, index) => (
                                <RepresentantsCard key={index} representant={item.representant} ufs={item.ufs} />
                            ))
                        ) : (
                            <p>Nenhum representante encontrado para este Estado.</p>
                        )}
                    </div>
                </div>
            </PageContainer>
            <Footer />
        </div>
    );
}
