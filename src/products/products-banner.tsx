import Image from 'next/image';
import Banner from '../../public/imgs/products/header.svg'
import BannerMobile from '../../public/imgs/products/header-mobile.svg'

export function ProductsBanner() {
  return (
    <div className="w-full">
      <Image
        src={Banner}
        alt="Banner Produtos"
        className="w-full h-auto hidden md:block"
      />
      <Image
        src={BannerMobile}
        alt="Banner Produtos"
        className="w-full h-auto block md:hidden"
      />
    </div>
  );
}
