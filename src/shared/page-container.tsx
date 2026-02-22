import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  variant?: 'default' | 'narrow';
}

export default function PageContainer({ children, variant = 'default' }: PageContainerProps) {
  return (
    <div className={`flex flex-col items-center w-full gap-10 md:gap-20 py-8 px-4 sm:px-12 lg:px-0 md:py-20 text-blue-ignition ${variant === 'default' ? 'max-w-7xl' : 'max-w-6xl'}`}>
      {children}
    </div>
  );
}
