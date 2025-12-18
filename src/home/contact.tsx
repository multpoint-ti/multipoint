"use client"

import Image from 'next/image';
import Arrow from '../../public/imgs/arrow.svg';
import { Button } from '@/shared/button';
import { Clock, Mail, Phone } from 'lucide-react';
import SelectInput from '@/shared/select-input';
import Input from '@/shared/input';
import { states } from '@/representants/representants';
import InputTextArea from '@/shared/input-text-area';
import { useState } from 'react';

export default function Contact() {
    const [assunto, setAssunto] = useState('undefined');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [estado, setEstado] = useState('sp');
    const [mensagem, setMensagem] = useState('');

    const contactInfo = [
        { icon: Mail, text: 'vendas@manchesterrep.com.br' },
        { icon: Phone, text: '(18) 99795-5086' }
    ];

    const contactType = [
        { value: 'undefined', label: 'Assunto' },
        { value: 'orcamento', label: 'Solicitar um orçamento' },
        { value: 'ajuda', label: 'Entrar em contato com suporte' },
    ];

    return (
        <section id="contato" className="flex flex-col lg:flex-row gap-20 items-center justify-center bg-gray-soft w-full py-10 md:py-20 px-4">

            <div className='flex flex-col lg:flex-row gap-8 md:gap-2 items-start max-w-7xl'>
                <div className='flex flex-col gap-6 md:gap-10 items-center lg:items-start lg:w-1/2 text-center lg:text-start'>
                    <div className='flex flex-col gap-2 items-center lg:items-start text-center lg:text-start'>
                        <Image
                            src={Arrow}
                            alt="Arrow"
                            className='hidden md:block'
                        />
                        <h1 className="text-3xl md:text-5xl font-medium text-start md:text-start max-w-3xl leading-tight">
                            Entre em contato
                        </h1>
                        <p className="text-base md:text-lg">
                            Tem uma dúvida ou precisa de um orçamento? <strong>Preencha o formulário</strong> <span className='hidden md:block'>ou entre em contato por um de nossos canais</span> abaixo:
                        </p>
                    </div>

                    <div className='flex bg-white px-4 py-3 rounded-lg items-center gap-2 text-base md:text-lg'>
                        <Clock className='hidden md:block h-4 w-4' />
                        <p>Atendimento de Segunda a Sexta das 08h às 18h</p>
                    </div>

                    <div className='gap-2 hidden md:flex flex-col text-base md:text-lg'>
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <Icon className='h-6 w-6 p-1 text-blue-gravel-mist rounded-full bg-white' />
                                    <span>{info.text}</span>
                                </div>
                            );
                        })}
                    </div>
                    <Button variant="default" className='hidden md:block text-white text-base md:text-lg md:px-6'>Conversar no WhatsApp</Button>
                </div>

                <div className="flex flex-col items-start w-full lg:w-1/2 md:px-10 gap-4 md:gap-6">
                    <SelectInput
                        id="contact-type"
                        className='bg-white w-full'
                        options={contactType}
                        onSelect={(value) => setAssunto(value)}
                        value={assunto}
                    />
                    <Input
                        id="contact-name"
                        className='bg-white w-full'
                        placeholder='Nome'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        type="text"
                    />
                    <Input
                        id="contact-email"
                        className='bg-white w-full'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                    <div className='flex flex-row gap-4 w-full'>
                        <Input
                            id="contact-phone"
                            className='bg-white w-full'
                            placeholder='Telefone'
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            type="text"
                        />
                        <SelectInput
                            id="contact-state"
                            className='bg-white w-full'
                            options={states}
                            onSelect={(value) => setEstado(value)}
                            value={estado}
                        />
                    </div>
                    <InputTextArea
                        id="contact-message"
                        className='bg-white w-full'
                        placeholder='Mensagem'
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                    />
                    <Button variant="default" className='text-white text-base md:text-lg px-6 bg-blue-gravel-mist w-full md:max-w-40'>Enviar</Button>
                </div>

                <div className='gap-6 flex md:hidden flex-col text-base md:text-lg pt-6'>
                    <p className="text-center text-base md:text-lg">
                        <strong>Ou</strong> entre em contato por um de nossos canais abaixo:
                    </p>
                    <div className='flex flex-col gap-2'>
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <Icon className='h-6 w-6 p-1 text-blue-gravel-mist rounded-full bg-white' />
                                    <span>{info.text}</span>
                                </div>
                            );
                        })}
                    </div>
                    <Button variant="default" className='text-white text-base md:text-lg md:px-6'>Conversar no WhatsApp</Button>
                </div>

            </div>
        </section>
    )
}