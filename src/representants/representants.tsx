"use client"

import SelectInput from '@/shared/select-input';
import { Menu } from '../shared/menu';
import { MapBrazil } from 'react-brazil-map';
import { useState } from 'react';
import PageContainer from '@/shared/page-container';

export default function RepresentantsPageComponent() {
    const states = [
        { value: 'sp', label: 'São Paulo' },
        { value: 'rj', label: 'Rio de Janeiro' },
        { value: 'mg', label: 'Minas Gerais' },
    ];
    const [selectedState, setSelectedState] = useState('');

    return (
        <div className='flex flex-col items-center w-full'>
            <Menu />
            <PageContainer>
                <div className='flex flex-row items-center w-full'>
                    <div className='flex flex-col items-start w-1/2 gap-8'>
                        <div className='flex flex-col items-start gap-3'>
                            <h1 className="text-3xl md:text-5xl font-semibold text-start md:text-start max-w-3xl leading-tight">
                                Encontre um <br /> <span className="text-blue-gravel-mist font-bold">representante</span>
                            </h1>
                            <p className="text-base md:text-lg">
                                Clique em um dos Estados destacados no mapa para acessar os dados dos nossos representantes ou utilize o filtro abaixo:
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className="text-base md:text-lg">
                                Filtre por estado:
                            </p>
                            <SelectInput
                                id="state-select"
                                options={states}
                                onSelect={setSelectedState}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-1/2'>
                        {/** plugin do mapa do brasil que permita mudar as cores e filtrar uma lista de representantes clicando nos estados */}
                        <MapBrazil 
                            onSelect={setSelectedState} 
                            width={700}
                            height={500}
                            type = 'select-single'
                        />
                        {selectedState && <p>Estado selecionado: {selectedState}</p>}
                    </div>
                </div>
            </PageContainer>
        </div>
    );
}
