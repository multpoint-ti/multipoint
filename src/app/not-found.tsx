import Link from 'next/link';
import { Menu } from '@/shared/menu';
import { Footer } from '@/shared/footer';
import { Home } from 'lucide-react';
import { Button } from '@/shared/button';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 space-y-4">
        <h1 className="text-8xl font-bold text-blue-gravel-mist">404</h1>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-center">
            Página não encontrada
          </h2>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            A página que você está procurando não existe ou foi removida.
          </p>
        </div>
        <Link
          href="/"
          className="mt-4"
        >
          <Button variant={'ignition'} className='text-white gap-4 flex'>
            <Home className="w-5 h-5" />
            Voltar para a Home
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
