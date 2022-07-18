import cn from 'classnames';
import Image from '@components/ui/image';
import { Product } from '@framework/types';

// import { useTranslation } from 'next-i18next';
import productPlaceholder from '@assets/placeholders/product-placeholder.png';

interface ProductProps {
  doctor: Product;
  className?: string;
}
const DoctorCard: React.FC<any> = ({ doctor, className }) => {
  return (
    <article
      className={cn(
        'bg-brand-sidebarColor flex flex-col group rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full max-w-xs',
        className
      )}
    >
      <div className="relative shrink-0 overflow-hidden">
        <div className="flex max-w-[260px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={
              doctor?.avatar
                ? `${process?.env?.NEXT_PUBLIC_ASSETS_API_ENDPOINT}${doctor?.avatar}`
                : productPlaceholder
            }
            alt={'Product Image'}
            width={260}
            height={200}
            quality={100}
            className="object-cover bg-fill-thumbnail"
          />
        </div>
      </div>

      <div className="px-3 md:px-4 lg:px-[18px] pt-2">
        <h2 className="text-brand-dark text-13px sm:text-18px lg:text-18px mb-1.5 font-bold">
          Name: {doctor?.name}
        </h2>
        <div className="leading-5 sm:leading-6 mb-2">
          <h3 className="text-brand-genericName text-13px sm:text-sm lg:text-15px mb-1">
            Degree: {doctor?.degree}
          </h3>
          <h3 className="text-brand-manufacure text-13px sm:text-sm lg:text-15px">
            Doctor Fee : {doctor?.doctor_fee}
          </h3>
        </div>
      </div>
    </article>
  );
};

export default DoctorCard;
