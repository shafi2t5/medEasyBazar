import Container from '@components/ui/container';
import Layout from '@components/layout/layout-six';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchCategoryProducts } from '@framework/product/get-category-products';
import SectionHeader from '@components/common/section-header';
import { useEffect, useState } from 'react';
import { useUI } from '@contexts/ui.context';

export default function Category({ category }: { category: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isData, setIsData] = useState(true);
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
    if (categoryLimit !== 0) {
      setCategoryLimit(10);
    }
    setIsData(true);
  }, [categoryName]);

  useEffect(() => {
    if (!isData) return;
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching, isData]);

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

    if (data?.data?.category_products.length < 1) {
      setIsData(false);
    }

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
        title="Category"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="category"
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
        {(isLoading || (isFetching && isData)) && (
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
