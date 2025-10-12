import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col items-center w-full gap-10 md:gap-20 max-w-7xl py-4 px-4 md:py-20 text-blue-ignition'>
      {children}
    </div>
  );
}
