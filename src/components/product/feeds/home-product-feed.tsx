import ProductsCarousel from '@components/product/products-carousel';
import { useHomeProductsQuery } from '@framework/product/get-all-home-products';
import { LIMITS } from '@framework/utils/limits';

export default function HomeProductFeed() {
  const { data, isLoading, error } = useHomeProductsQuery();

  return (
    <>
      {data?.medicine_homepage_products?.map((products, index) => (
        <ProductsCarousel
          sectionHeading={products?.title}
          categorySlug={`category?category=${products?.title}`}
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
