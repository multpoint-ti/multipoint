import { MailIcon, PhoneIcon } from "lucide-react";

export type Representant = {
    nome: string;
    fones: {
        fone: string;
    }[];
    emails: {
        email: string;
    }[];
    obs?: string;
}

export const RepresentantsCard = ({ representant }: { representant: Representant }) => {
    return (
        //quero que todos tenham a mesma altura 
        <div className='flex flex-col w-full h-full max-w-[400px] p-6 gap-4 border border-gray-oxide-steel rounded-xl hover:bg-gray-100'>
            <div className='text-lg font-bold uppercase'>{representant.nome}</div>
            {representant.fones.map((fone, index) => (
                <div className='flex flex-row items-center justify-start w-full gap-2' key={index}>
                    <PhoneIcon className='w-5 h-5 bg-blue-ignition rounded-full p-1 text-white' />
                    <div className='text-base'>{fone.fone}</div>
                </div>
            ))}
            {representant.emails.map((email, index) => (
                <div className='flex flex-row items-center justify-start w-full gap-2' key={index}>
                    <MailIcon className='w-5 h-5 bg-blue-ignition rounded-full p-1 text-white' />
                    <div className='text-base break-all'>{email.email}</div>    
                </div>
            ))}
            {representant.obs && (
                <div className='text-sm text-gray-500'>{representant.obs}</div>
            )}
        </div>
    );
}
