"use client";

import { Mail, MapPin, Phone, Facebook, Instagram, Clock, Download } from 'lucide-react';
import Image from 'next/image';

import Logo from '../../public/imgs/logo-complete-dark.png';
import { Button } from './button';

const handleDownloadCatalog = () => {
  const link = document.createElement('a');
  link.href = '/data/MP_CATALOGO_2025.pdf';
  link.download = 'MP_CATALOGO_2025.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function Footer() {

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/sobre-nos', label: 'Sobre Nós' },
    { href: '/representantes', label: 'Representantes' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contato', label: 'Contato' },
  ];

  const contactInfo = [
    { icon: Clock, text: 'Atendimento de Segunda a Sexta das 08h às 18h' },
    { icon: MapPin, text: 'Endereço: Rua São Paulo, 473 - Jardim Planalto, Registro/SP' },
    { icon: Mail, text: 'Email: multpoint@multpoint.com' },
    { icon: Phone, text: 'Telefone: (13) 3822-2737' }
  ];

  const socialLinks = [
    { href: 'https://www.facebook.com', icon: Facebook },
    { href: 'https://www.instagram.com', icon: Instagram }
  ]

  return (
    <footer className='w-full bg-blue-ignition items-center flex justify-center py-10 lg:py-20 px-8 text-white'>
      <div className='items-start justify-between flex flex-col lg:flex-row w-full max-w-[1600px] gap-10 lg:gap-8'>

        {/* Social Media column */}
        <div className="flex flex-col items-center gap-2 w-full lg:w-1/6">
          <Image src={Logo} alt='Logo' className='h-24 w-auto' />
          <div className='flex gap-4'>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className='text-base lg:text-sm hover:underline'>
                  <Icon className='h-6 w-6 p-1 text-blue-gravel-mist rounded-sm bg-white' />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navegue column */}
        <div className="flex flex-col text-base lg:text-sm w-full gap-3 lg:w-1/6">
          <h3 className='uppercase font-semibold text-base'>
            Navegue
          </h3>
          {navLinks.map((info, index) => {
            return (
              <div key={index}>
                <a href={info.href} className='hover:text-red-amber-torque focus:text-red-amber-torque hover:cursor-pointer'>{info.label}</a>
              </div>
            );
          })}
        </div>

        {/* Fale Conosco column */}
        <div className="flex flex-col text-sm w-full gap-4 lg:w-2/6">
          <h3 className='uppercase font-semibold text-base'>
            Fale Conosco
          </h3>
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon className='h-5 w-5 p-[2px] text-blue-gravel-mist rounded-full bg-white' />
                <span>{info.text}</span>
              </div>
            );
          })}
        </div>

        {/* Fale Conosco column */}
        <div className="flex flex-col w-full text-base lg:text-lg gap-4 lg:w-2/6">
          <h3 className=''>
            Acesse nosso catálogo completo com todos os produtos, códigos e especificações técnicas
          </h3>
          <Button variant="white" className='max-w-96 text-base lg:text-lg' onClick={handleDownloadCatalog}>
            <Download className="mr-2 h-5 w-5" />
            Baixe nosso Catálogo
          </Button>
        </div>

      </div>
    </footer>
  )
}