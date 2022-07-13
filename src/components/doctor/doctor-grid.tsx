import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { Product } from '@framework/types';
import DoctorCard from './doctor-card';

interface ProductGridProps {
  className?: string;
  data: any;
  error: any;
  isLoading: any;
}

export const DoctorGrid: FC<ProductGridProps> = ({
  className = '',
  data,
  error,
  isLoading,
}) => {
  const { t } = useTranslation('common');

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5 gap-3 md:gap-4 2xl:gap-5',
          className
        )}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.pages?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : data.length > 0 ? (
          data?.map((doctor: Product, index: number) => (
            <DoctorCard
              key={`product--key-${doctor.id}-${index}`}
              doctor={doctor}
            />
          ))
        ) : null}
        {/* end of error state */}
      </div>
    </>
  );
};
