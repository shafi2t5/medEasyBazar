import type { FC } from 'react';
// import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
// import Button from '@components/ui/button';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
// import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';

interface ProductGridProps {
  className?: string;
  data: any;
  error: any;
  isLoading: any;
}

export const ProductGrid: FC<ProductGridProps> = ({
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
          data?.map((product: Product, index: number) => (
            <ProductCard
              key={`product--key-${product.id}-${index}`}
              product={product}
            />
          ))
        ) : null}
        {/* end of error state */}
      </div>
      {/* {hasNextPage && (
        <div className="text-center pt-8 xl:pt-10">
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )} */}
    </>
  );
};
