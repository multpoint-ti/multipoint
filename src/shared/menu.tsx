//criar componente de menu
//menu terá uma faixa azul superior, que tera as informacoes endereco, telefone, email e icons redes sociais. cada texto sera acompanhado de um icon da lucide icons. deixe space-between
//a parte de baixo da faixa do menu, tera a imagem da logo, um menu de links do site, e uma barra de search
//crie um outro componente para a barra de search no file src\shared\search-bar.tsx
//o menu deve ser responsivo, sendo que em telas pequenas, a faixa azul deve manter apenas o telefone e s redes sociais 
//ja a parte debaixo do menu ficara a logo, e um icon de menu hamburguer e logo abaixo deles, a barra de pesquisa
//ao clicar no menu hamburguer, aparecera um menu com os links do site um abaixo do outro, sobrepondo a tela inteira, mas sem ocultar a faixa azul. mantenha a logo tambem, so mude o icon de hamburguer para um X

"use client";

import { useState } from 'react';
import { Mail, MapPin, Phone, X, Facebook, Instagram } from 'lucide-react';
import { SearchBar } from './search-bar';
import Image from 'next/image';

// Assuming you have a logo file in public/images/logo.png
import Logo from '../../public/imgs/logo-complete.png';
import MenuIcon from '../../public/imgs/burguer-menu-icon.svg';

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Produtos' },
    { href: '#', label: 'Empresa' },
    { href: '#', label: 'Representantes' },
    { href: '#', label: 'Catálogo' },
    { href: '#', label: 'Contato' },
  ];

  return (
    <header>
      {/* Top blue bar */}
      <div className="bg-blue-gravel-mist text-white p-2">
        <div className="container px-4 md:px-8 flex justify-between items-center text-sm">
            <div className="hidden md:flex items-center gap-2">
              <MapPin className='h-5 w-5 p-[2px] text-blue-gravel-mist rounded-full bg-white' />
              <span>Rua São Paulo, 473 - Jardim Planalto, Registro/ SP</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className='h-5 w-5 p-[2px] text-blue-gravel-mist rounded-full bg-white' />
              <span>vendas@manchesterrep.com.br</span>
            </div>
          <div className="flex items-center gap-2">
            <Phone className='h-5 w-5 p-[2px] text-blue-gravel-mist rounded-full bg-white' />
            <span>(18) 99795-5086</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Add social icons here */}
            <a href="">
                <Facebook className='h-5 w-5 p-[2px] text-blue-gravel-mist rounded-sm bg-white' />
            </a>
            <a href="">
                <Instagram className='h-5 w-5 p-[2px] text-blue-gravel-mist rounded-sm bg-white' />
            </a>
          </div>
        </div>
      </div>

      {/* Main menu */}
      <div className="container mx-auto px-4 md:px-20 py-2 md:py-4 flex justify-between items-center">
        <Image src={Logo} alt="Logo" className='h-10 md:h-16 w-auto' />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-blue-ignition hover:text-red-amber-torque hover:underline duration-200 transition uppercase">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block w-1/4">
          <SearchBar />
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className='h-4 w-auto' /> : <Image src={MenuIcon} alt="MenuIcon" className='h-3 w-auto' />}
          </button>
        </div>
      </div>
      <div className="md:hidden container mx-auto px-4 pb-4">
        <SearchBar />
      </div>


      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <Image src={Logo} alt="Logo" width={150} height={40} />
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full gap-8 text-xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}