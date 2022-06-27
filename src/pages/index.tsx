import Layout from '@components/layout/layout-six';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import BundleGrid from '@components/bundle/bundle-grid';
import CollectionGrid from '@components/common/collection-grid';
import HeroBannerCard from '@components/hero/hero-banner-card';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import CategoryGridBlock from '@components/common/category-grid-block';
import { homeSixHeroBanner as heroBanner } from '@framework/static/banner';
import { homeTwoBanner as banner } from '@framework/static/banner';
import BannerCard from '@components/cards/banner-card';
import { bundleDataTwo as bundle } from '@framework/static/bundle';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchBestSellerGroceryProducts } from '@framework/product/get-all-best-seller-grocery-products';
import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import { LIMITS } from '@framework/utils/limits';

export default function Home() {
  return (
    <>
      <Seo
        title="Grocery & Food Store React Template"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/"
      />
      <div className="col-span-full">
        <BannerCard banner={banner} className="py-5" />
      </div>
      <BundleGrid className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20" data={bundle} />
      {/* <Container>
        <CategoryGridBlock />
        <BestSellerGroceryProductFeed />
        <BannerCard
          banner={banner}
          className="mb-12 lg:mb-14 xl:pb-3"
          effectActive={false}
        />
        <PopularProductFeed />
      </Container>
      <CollectionGrid
        headingPosition="center"
        className="pb-1 mb-12 xl:pt-2 2xl:pt-4 3xl:pt-6 lg:pb-0 lg:mb-14 xl:mb-16 2xl:mb-20"
      /> */}
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS,
      { limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS },
    ],
    fetchBestSellerGroceryProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.POPULAR_PRODUCTS, { limit: LIMITS.POPULAR_PRODUCTS_LIMITS }],
    fetchPopularProducts
  );

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
