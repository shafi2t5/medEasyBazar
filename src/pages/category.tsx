import Container from '@components/ui/container';
import Layout from '@components/layout/layout-six';
import { ShopFilters } from '@components/search/filters';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import { GetStaticProps } from 'next';
import { Element } from 'react-scroll';
import SearchTopBar from '@components/search/search-top-bar';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import {
  fetchProducts,
  useProductsQuery,
} from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import { useRouter } from 'next/router';
import SectionHeader from '@components/common/section-header';

export default function Category() {
  const { query } = useRouter();
  const { isLoading, data, error } = useProductsQuery({
    limit: LIMITS.PRODUCTS_LIMITS,
    ...query,
  });

  const category: any = query?.category;

  return (
    <>
      <Seo
        title="Search"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="search"
      />
      <Container>
        <div className="pb-3 mt-3">
          <SectionHeader sectionHeading={category} className="mb-0" />
        </div>
        <div className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
          <ProductGrid
            isLoading={isLoading}
            error={error}
            data={data?.data?.category_products || []}
          />
        </div>
      </Container>
    </>
  );
}

Category.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
  //   fetchCategories
  // );
  // await queryClient.prefetchInfiniteQuery(
  //   [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
  //   fetchProducts
  // );

  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.POPULAR_PRODUCTS, query.category],
  //   fetchPopularProducts
  // );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
