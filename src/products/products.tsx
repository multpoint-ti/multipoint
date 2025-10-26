import PageContainer from '@/shared/page-container';
import { Footer } from '@/shared/footer';
import { Menu } from '@/shared/menu';

export default function HomePageComponent() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <PageContainer>
        <div>
            <h1>LISTA DE PRODUTOS</h1>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
