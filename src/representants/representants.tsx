"use client"

import SelectInput from '@/shared/select-input';
import { Menu } from '../shared/menu';
import { MapBrazil } from 'react-brazil-map';
import { useState } from 'react';
import PageContainer from '@/shared/page-container';
import Image from 'next/image';
import Arrow from '../../public/imgs/arrow.svg';
import { Representant, RepresentantsCard } from './representants-card';

export default function RepresentantsPageComponent() {
    const states = [
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
    ].sort((a, b) => a.label.localeCompare(b.label));

    const representants: { [key: string]: Representant[] } = {
        pa: [{
            nome: "Jorge Luiz Xavier Hage-ME",
            fones: [{ fone: "(91) 3244-7967" }, { fone: "(91) 99259-4104" }],
            emails: [{ email: "mohage2@yahoo.com.br" }]
        }],
        ma: [{
            nome: "Moita Representação de Peças e Acessórios para Veículos Ltda",
            fones: [{ fone: "(86) 4141-8581" }, { fone: "(86) 99919-0316" }],
            emails: [{ email: "moitarepresentacao2@outlook.com" }, { email: "lameckmoita@hotmail.com" }]
        }],
        pi: [{
            nome: "Moita Representação de Peças e Acessórios para Veículos Ltda",
            fones: [{ fone: "(86) 4141-8581" }, { fone: "(86) 99919-0316" }],
            emails: [{ email: "moitarepresentacao2@outlook.com" }, { email: "lameckmoita@hotmail.com" }]
        }],
        pe: [{
            nome: "IG Prestação de Serviços de Marketing Direto e Promoção de Vendas Ltda",
            fones: [{ fone: "(81) 3325-3365" }],
            emails: [{ email: "escritorio.igrepresentacoes@gmail.com" }]
        }],
        se: [{
            nome: "Elmo Freire Lobo",
            fones: [{ fone: "(79) 99847-0990" }],
            emails: [{ email: "lobos-representacoes@hotmail.com" }]
        }],
        mt: [{
            nome: "Manchester Representações S/S Ltda",
            fones: [{ fone: "(18) 3908-7766" }, { fone: "(18) 99795-5086" }],
            emails: [{ email: "vendas@manchesterrep.com.br" }]
        }],
        ba: [{
            nome: "Jorge Soledade Nascimento",
            fones: [{ fone: "(71) 3313-8230" }, { fone: "(71) 99989-0722" }],
            emails: [{ email: "rogina.ba@gmail.com" }]
        }],
        go: [{
            nome: "C.A.R. Faria Representações Ltda",
            fones: [{ fone: "(62) 3296-4216" }],
            emails: [{ email: "carfaria@gmail.com" }]
        }],
        df: [{
            nome: "C.A.R. Faria Representações Ltda",
            fones: [{ fone: "(62) 3296-4216" }],
            emails: [{ email: "carfaria@gmail.com" }]
        }],
        ms: [{
            nome: "Manchester Representações S/S Ltda",
            fones: [{ fone: "(18) 3908-7766" }, { fone: "(18) 99795-5086" }],
            emails: [{ email: "vendas@manchesterrep.com.br" }]
        }],
        mg: [{
            nome: "ACP Representações Promoções e Eventos Ltda",
            fones: [{ fone: "(31) 3442-8834" }],
            emails: [{ email: "penna_rep@hotmail.com" }]
        }],
        sp: [
            {
                nome: "A.R. Holtz Comércio e Representação Ltda",
                fones: [{ fone: "(15) 3238-6657" }, { fone: "(15) 99740-3597" }],
                emails: [{ email: "antonioholtz@hotmail.com" }],
                obs: "Atende no Interior de São Paulo"
            },
            {
                nome: "GHS Representações Comerciais SC Ltda",
                fones: [{ fone: "(11) 94891-0150" }],
                emails: [{ email: "antonioghissardi@hotmail.com" }],
                obs: "Atende na Capital de São Paulo"
            }
        ],
        es: [{
            nome: "Krecel Com. e Representações Ltda",
            fones: [{ fone: "(21) 99966-0570" }],
            emails: [{ email: "krecelrepresentacoes@yahoo.com.br" }]
        }],
        rj: [{
            nome: "Krecel Com. e Representações Ltda",
            fones: [{ fone: "(21) 99966-0570" }],
            emails: [{ email: "krecelrepresentacoes@yahoo.com.br" }]
        }],
        pr: [{
            nome: "Marcelo Fossati Representações",
            fones: [{ fone: "(41) 3349-2238" }, { fone: "(41) 99943-2238" }],
            emails: [{ email: "marcelofossati@bol.com.br" }]
        }],
        sc: [{
            nome: "VR7 Representações Comerciais Ltda",
            fones: [{ fone: "(47) 9288-9176" }],
            emails: [{ email: "comercial@vr7representacoes.com.br" }]
        }],
        rs: [{
            nome: "Adelino Ricardo Dias Madeira & Cia Ltda",
            fones: [{ fone: "(53) 3225-2167" }, { fone: "(53) 98115-5415" }],
            emails: [{ email: "anacristina.ardm@terra.com.br" }]
        }]
    };

    const [selectedState, setSelectedState] = useState('all');

    const getFilteredRepresentants = () => {
        if (selectedState === 'all') {
            return Object.values(representants).flat();
        }
        return representants[selectedState as keyof typeof representants] || [];
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
                                <Image
                                    src={Arrow}
                                    alt="Logo"
                                />
                                <h1 className="text-3xl md:text-6xl font-semibold text-start md:text-start max-w-3xl leading-tight">
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
                    <div className='flex flex-wrap items-start h-full w-full pt-10 gap-4'>
                        {filteredRepresentants.length > 0 ? (
                            filteredRepresentants.map((representant, index) => (
                                <RepresentantsCard key={index} representant={representant} />
                            ))
                        ) : (
                            <p>Nenhum representante encontrado para este estado.</p>
                        )}
                    </div>
                </div>
            </PageContainer>
        </div>
    );
}
