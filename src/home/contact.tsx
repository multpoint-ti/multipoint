"use client"

import Image from 'next/image';
import Arrow from '../../public/imgs/arrow.svg';
import { Button } from '@/shared/button';
import { Clock, Mail, Phone } from 'lucide-react';
import SelectInput from '@/shared/select-input';
import Input from '@/shared/input';
import { states } from '@/representants/representants';
import InputTextArea from '@/shared/input-text-area';

export default function Contact() {
    const contactInfo = [
        { icon: Mail, text: 'Email: vendas@manchesterrep.com.br' },
        { icon: Phone, text: 'Telefone: (18) 99795-5086' }
    ];

    return (
        <section className="flex flex-col lg:flex-row gap-20 items-center justify-center bg-gray-soft w-full py-20">

            <div className='flex flex-col lg:flex-row gap-2 items-start max-w-7xl'>
                <div className='flex flex-col gap-10 items-center lg:items-start lg:w-1/2 text-center lg:text-start'>
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
                            Ficou alguma dúvida ou gostaria de falar com a gente? Entre em contato por um de nossos canais, ficaremos felizes em ajudar!
                        </p>
                    </div>

                    <div className='flex bg-white px-4 py-3 rounded-lg items-center gap-2 text-lg'>
                        <Clock className='h-4 w-4' />
                        <p>Atendimento de Segunda a Sexta das 08h às 18h</p>
                    </div>

                    <div className='gap-2 flex flex-col text-lg'>
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

                    <Button variant="default" className='text-white text-lg px-6'>Enviar Mensagem no WhatsApp</Button>
                </div>

                <div className="hidden lg:flex flex-col lg:w-1/2 px-10 gap-6">
                    <SelectInput
                        id="contact-type"
                        className='bg-white'
                        options={[
                            { value: 'undefined', label: 'Assunto' },
                            { value: 'email', label: 'Email' },
                            { value: 'phone', label: 'Telefone' },
                        ]}
                        onSelect={(value) => console.log(value)}
                        value='undefined'
                    />
                    <Input
                        id="contact-name"
                        className='bg-white'
                        placeholder='Nome'
                        value=''
                    />
                    <Input
                        id="contact-email"
                        className='bg-white'
                        placeholder='Email'
                        value=''
                    />
                    <div className='flex flex-row gap-4 w-full'>
                        <Input
                            id="contact-phone"
                            className='bg-white w-full'
                            placeholder='Telefone'
                            value=''
                        />
                        <SelectInput
                            id="contact-type"
                            className='bg-white w-full'
                            options={states}
                            onSelect={(value) => console.log(value)}
                            value='sp'
                        />
                    </div>
                    <InputTextArea
                        id="contact-message"
                        className='bg-white'
                        placeholder='Mensagem'
                        value=''
                    />
                </div>
            </div>
        </section>
    )
}