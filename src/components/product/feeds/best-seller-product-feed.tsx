import ProductsCarousel from '@components/product/products-carousel';
import { UIContext } from '@contexts/ui.context';
import { useHomeProductsQuery } from '@framework/product/get-all-best-seller-products';
import { LIMITS } from '@framework/utils/limits';
import { ROUTES } from '@utils/routes';

export default function BestSellerProductFeed() {
  const { data, isLoading, error } = useHomeProductsQuery();

  return (
    <>
      {data?.medicine_homepage_products?.map((products, index) => (
        <ProductsCarousel
          sectionHeading={products?.title}
          categorySlug={ROUTES.PRODUCTS}
          products={products?.products}
          loading={isLoading}
          error={error?.message}
          limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
          uniqueKey="home-products"
          key={index}
        />
      ))}
    </>
  );
}
