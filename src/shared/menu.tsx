"use client";

import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, X, Facebook, Instagram, Link } from 'lucide-react';
import { SearchBar } from './search-bar';
import Image from 'next/image';

import Logo from '../../public/imgs/logo-complete.png';
import MenuIcon from '../../public/imgs/burguer-menu-icon.svg';

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/sobre-nos', label: 'Sobre Nós' },
    { href: '/representantes', label: 'Representantes' },
    { href: '/blog', label: 'Blog' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <header className='w-full'>
      {/* Top blue bar */}
      <div className="bg-blue-gravel-mist text-white p-2 w-full items-center justify-center flex">
        <div className="container px-4 md:px-8 flex justify-between items-center text-sm w-full">
          <div className="hidden md:flex items-center gap-2">
            <MapPin className='h-5 w-5 p-[2px] text-blue-gravel-mist rounded-full bg-white' />
            <span>Rua São Paulo, 473 - Jardim Planalto, Registro/SP</span>
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
      <div className="container mx-auto px-4 md:px-20 py-2 md:py-4 flex justify-between items-center w-full">
        <a href="/home">
          <Image src={Logo} alt="Logo" className='h-10 md:h-16 w-auto' />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-blue-ignition text-sm hover:text-red-amber-torque hover:underline duration-200 transition uppercase">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block w-1/4">
          <SearchBar />
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className='h-6 w-auto text-blue-ignition' /> : <Image src={MenuIcon} alt="MenuIcon" className='h-3 w-auto' />}
          </button>
        </div>
      </div>
      <div className="md:hidden container mx-auto px-4 pb-4">
        <SearchBar />
      </div>


      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white h-full min-h-[calc(100vh-64px)]">
          <nav className="container mx-auto flex flex-col items-center py-4 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-blue-ignition uppercase text-lg font-normal hover:text-red-amber-torque duration-200 transition"
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