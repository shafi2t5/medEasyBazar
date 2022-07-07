import Container from '@components/ui/container';
import Layout from '@components/layout/layout-six';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchCategoryProducts } from '@framework/product/get-all-products';
// import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import SectionHeader from '@components/common/section-header';
import { useEffect, useState } from 'react';
import { useUI } from '@contexts/ui.context';

export default function Category({ category }: { category: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const {
    setCategoryList,
    setCategoryLimit,
    categoryLimit,
    categoryList,
    categoryName,
  } = useUI();

  const categoryNames: any = categoryName || category;
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [categoryName]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function fetchMoreListItems() {
    setTimeout(async () => {
      fetchCategory();
      setIsFetching(false);
    }, 2000);
  }

  async function fetchCategory() {
    const data: any = await fetchCategoryProducts({
      category: categoryNames,
      setIsLoading,
      categoryLimit,
      setCategoryLimit,
    });

    setCategoryList([...categoryList, ...data?.data?.category_products]);
  }

  function handleScroll() {
    const categoryGrid: any = document.getElementById('CategoryGrid');
    if (
      window.innerHeight + document.documentElement.scrollTop <
      categoryGrid.offsetHeight
    )
      return;
    setIsFetching(true);
  }

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
        <div
          id="CategoryGrid"
          className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1"
        >
          <ProductGrid
            isLoading={isLoading}
            error={''}
            data={categoryList || []}
          />
        </div>
        {(isLoading || isFetching) && (
          <div className="mt-4 font-bold text-xl">Fetching more items...</div>
        )}
      </Container>
    </>
  );
}

Category.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
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
  // )

  console.log(query);

  return {
    props: {
      category: query.category,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
