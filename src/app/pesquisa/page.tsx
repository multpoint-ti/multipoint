import { Suspense } from 'react';
import PesquisaPageComponent from '@/pesquisa/pesquisa';

export default function PesquisaPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PesquisaPageComponent />
    </Suspense>
  );
}
