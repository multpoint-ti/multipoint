import { Button } from '@/shared/button';
import { Map } from 'lucide-react';
import Link from 'next/link';

export default function Address() {
    return (
        <section className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="hidden lg:flex flex-col lg:w-1/2">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.6487502592895!2d-47.85775252388651!3d-24.497624296656934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c5339a55e9e869%3A0xd64f8f7617922c2b!2sR.%20S%C3%A3o%20Paulo%2C%20473%20-%20Jardim%20Planalto%2C%20Registro%20-%20SP%2C%2011900-000!5e0!3m2!1sen!2sbr!4v1760246718474!5m2!1sen!2sbr" width="600" height="450" loading="lazy"></iframe>
            </div>
            <div className='flex flex-col gap-2 items-center lg:items-start lg:w-1/2 text-center lg:text-start'>
                <h1 className="text-3xl md:text-5xl font-medium text-start md:text-start max-w-3xl leading-tight">
                    Venha nos conhecer
                </h1>
                <p className="text-base md:text-lg">
                    Nossa sede fica na Rua São Paulo, 473 – Jardim Planalto, Registro – SP, CEP 11900-000. Venha conhecer de perto nossa estrutura e processos de fabricação.
                </p>
                <Link href={'https://maps.app.goo.gl/qjpYFbaVraZ1Lgpd6'} className="lg:mt-4 gap-4 flex">
                    <Button variant="outline">
                        <Map className="mr-2 h-4 w-4" />
                        Abrir no Google Maps
                    </Button>
                </Link>
                <div className="flex flex-col items-center justify-center lg:hidden mt-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.6487502592895!2d-47.85775252388651!3d-24.497624296656934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c5339a55e9e869%3A0xd64f8f7617922c2b!2sR.%20S%C3%A3o%20Paulo%2C%20473%20-%20Jardim%20Planalto%2C%20Registro%20-%20SP%2C%2011900-000!5e0!3m2!1sen!2sbr!4v1760246718474!5m2!1sen!2sbr"
                        width="320"
                        height="300"
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </section>
    )
}