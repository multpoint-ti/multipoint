"use client"

import Image from 'next/image';
import Arrow from '../../public/imgs/arrow.svg';
import { Button } from '@/shared/button';
import { ArrowRight, CheckCircle, Clock, Mail, Phone, XCircle } from 'lucide-react';
import SelectInput from '@/shared/select-input';
import Input from '@/shared/input';
import { states } from '@/representants/representants';
import InputTextArea from '@/shared/input-text-area';
import { useState } from 'react';
import { z } from 'zod';

const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const contactSchema = z.object({
    assunto: z.string().refine((val) => val !== 'undefined', {
        message: 'Selecione um assunto',
    }),
    nome: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    telefone: z.string().min(1, 'Telefone é obrigatório').regex(
        /^\(\d{2}\) \d{4,5}-\d{4}$/,
        'Telefone inválido'
    ),
    estado: z.string().min(1, 'Estado é obrigatório'),
    mensagem: z.string().min(1, 'Mensagem é obrigatória').min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export default function Contact() {
    const [assunto, setAssunto] = useState('undefined');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [estado, setEstado] = useState('sp');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<ContactFormErrors>({});

    const handleSubmit = async () => {
        setErrors({});

        const formData = { assunto, nome, email, telefone, estado, mensagem };
        const result = contactSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: ContactFormErrors = {};
            result.error.issues.forEach((issue: z.ZodIssue) => {
                const field = issue.path[0] as keyof ContactFormErrors;
                if (!fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        setStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setAssunto('undefined');
                setNome('');
                setEmail('');
                setTelefone('');
                setEstado('sp');
                setMensagem('');
                setErrors({});
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

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
                        <p className="text-base md:text-lg hidden md:block">
                            Tem uma dúvida ou precisa de um orçamento? <br /> Preencha o formulário ou entre em contato por um de nossos canais abaixo:
                        </p>
                        <p className="text-base md:text-lg block md:hidden">
                            Tem uma dúvida ou precisa de um orçamento? Preencha o formulário abaixo:
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
                    {status === 'success' ? (
                        <div className="w-full flex flex-col gap-4">
                            <div className="bg-white rounded-lg p-6 flex items-center gap-4">
                                <CheckCircle className="h-10 w-10 text-blue-gravel-mist flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-lg">Email enviado!</p>
                                    <p className="text-gray-600">Logo nosso time entrará em contato.</p>
                                </div>
                            </div>
                            <Button
                                variant="default"
                                className="w-full md:max-w-60 text-white gap-2"
                                onClick={() => setStatus('idle')}
                            >
                                Enviar outro email
                                <ArrowRight className='text-white h-5 w-5' />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="w-full">
                                <SelectInput
                                    id="contact-type"
                                    className={`bg-white w-full ${errors.assunto ? 'border-red-500 border-1' : ''}`}
                                    options={contactType}
                                    onSelect={(value) => setAssunto(value)}
                                    value={assunto}
                                />
                                {errors.assunto && <p className="text-red-500 text-xs mt-1">{errors.assunto}</p>}
                            </div>
                            <div className="w-full">
                                <Input
                                    id="contact-name"
                                    className={`bg-white w-full ${errors.nome ? 'border-red-500 border-1' : ''}`}
                                    placeholder='Nome'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    type="text"
                                />
                                {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                            </div>
                            <div className="w-full">
                                <Input
                                    id="contact-email"
                                    className={`bg-white w-full ${errors.email ? 'border-red-500 border-1' : ''}`}
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">Ex: exemplo@email.com</p>}
                            </div>
                            <div className='flex flex-row gap-4 w-full'>
                                <div className="w-full">
                                    <input
                                        id="contact-phone"
                                        className={`bg-white w-full px-4 py-2 border-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 ${errors.telefone ? 'border-red-500 border-1' : 'border-gray-300'}`}
                                        placeholder='Telefone'
                                        type="text"
                                        value={telefone}
                                        onChange={(e) => setTelefone(formatPhone(e.target.value))}
                                    />
                                    {errors.telefone && <p className="text-red-500 text-xs mt-1">Ex: (11) 99999-9999</p>}
                                </div>
                                <div className="w-full">
                                    <SelectInput
                                        id="contact-state"
                                        className={`bg-white w-full ${errors.estado ? 'border-red-500 border-1' : ''}`}
                                        options={states}
                                        onSelect={(value) => setEstado(value)}
                                        value={estado}
                                    />
                                    {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado}</p>}
                                </div>
                            </div>
                            <div className="w-full">
                                <InputTextArea
                                    id="contact-message"
                                    className={`bg-white w-full ${errors.mensagem ? 'border-red-500 border-1' : ''}`}
                                    placeholder='Mensagem'
                                    value={mensagem}
                                    onChange={(e) => setMensagem(e.target.value)}
                                />
                                {errors.mensagem && <p className="text-red-500 text-xs mt-1">Mínimo 10 caracteres</p>}
                            </div>
                            <Button
                                variant="default"
                                className='text-white text-base md:text-lg px-6 bg-blue-gravel-mist w-full md:max-w-40 disabled:opacity-50'
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Enviando...' : 'Enviar'}
                            </Button>
                            {status === 'error' && (
                                <div className="w-full flex flex-col gap-4">
                                    <div className="bg-white rounded-lg p-6 flex items-center gap-4">
                                        <XCircle className="h-10 w-10 text-red-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-lg">Erro ao enviar email</p>
                                            <p className="text-gray-600">Tente novamente mais tarde.</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full md:max-w-48"
                                        onClick={() => setStatus('idle')}
                                    >
                                        Tentar novamente
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
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