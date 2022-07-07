import { ProductGrid } from '@components/product/product-grid';
import Container from '@components/ui/container';
import { useUI } from '@contexts/ui.context';
import { fetchSearchedProducts } from '@framework/product/use-search';
import React, { useState, useEffect } from 'react';

const SearchData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const [limit, setLimit] = useState(0);
  const { searchList, search_input, setSearchList } = useUI();
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function fetchMoreListItems() {
    setTimeout(async () => {
      const data = await fetchSearchedProducts({
        text: search_input,
        setIsLoading,
        limit,
        setLimit,
        isSearch: false,
      });

      setSearchList([...searchList, ...data?.medicines]);
      setIsFetching(false);
    }, 2000);
  }

  function handleScroll() {
    const productGrid: any = document.getElementById('productGrid');
    if (
      window.innerHeight + document.documentElement.scrollTop <
      productGrid.offsetHeight
    )
      return;
    setIsFetching(true);
  }

  return (
    <Container>
      <div
        id="productGrid"
        className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1"
      >
        <ProductGrid isLoading={false} error={false} data={searchList || []} />
      </div>
      {(isLoading || isFetching) && (
        <div className="mt-4 font-bold text-xl">Fetching more items...</div>
      )}
    </Container>
  );
};

export default SearchData;
