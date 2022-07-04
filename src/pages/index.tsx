import Layout from '@components/layout/layout-six';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BundleGrid from '@components/bundle/bundle-grid';
import { homeTwoBanner as banner } from '@framework/static/banner';
import BannerCard from '@components/cards/banner-card';
import { bundleDataTwo as bundle } from '@framework/static/bundle';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { LIMITS } from '@framework/utils/limits';
import CategoryGridListBlock from '@components/common/category-grid-list-block';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import { fetchBestSellerProducts } from '@framework/product/get-all-best-seller-products';
import HomeBanner from '@components/cards/home-banner';

export default function Home() {
  return (
    <>
      <Seo
        title="Grocery & Food Store React Template"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/"
      />
      <div className="col-span-full mb-7 lg:mb-8 xl:mb-9 2xl:mb-10">
        <HomeBanner />
      </div>
      <BundleGrid className="mb-7 lg:mb-8 xl:mb-9 2xl:mb-10" data={bundle} />
      <CategoryGridListBlock />
      <BestSellerProductFeed />
      {/* <DownloadApps /> */}
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
    fetchBestSellerProducts
  );
  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.POPULAR_PRODUCTS, { limit: LIMITS.POPULAR_PRODUCTS_LIMITS }],
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
