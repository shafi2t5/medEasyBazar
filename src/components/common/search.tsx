import React, { useState } from 'react';
import cn from 'classnames';
import { fetchSearchedProducts } from '@framework/product/use-search';
import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
// import useFreezeBodyScroll from '@utils/use-freeze-body-scroll';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';

type Props = {
  className?: string;
  searchId?: string;
  variant?: 'border' | 'fill';
};

const Search = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className = 'md:w-[730px] 2xl:w-[800px]',
      searchId = 'search',
      variant = 'border',
    },
    ref
  ) => {
    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
      setSearchList,
      setSearchInput,
      search_input,
    } = useUI();

    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [limit, setLimit] = useState(10);
    // useFreezeBodyScroll(
    //   inputFocus === true || displaySearch || displayMobileSearch
    // );
    async function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
      const data = await fetchSearchedProducts({
        text: search_input,
        setIsLoading,
        limit,
        setLimit,
        isSearch: true,
      });

      setSearchList(data?.medicines);
    }

    async function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchInput(e.currentTarget.value);
      if (e.currentTarget.value === '') {
        setSearchList([]);
      } else {
        const data = await fetchSearchedProducts({
          text: search_input,
          setIsLoading,
          limit,
          setLimit,
          isSearch: true,
        });

        setSearchList(data?.medicines);
      }
    }
    function clear() {
      setSearchInput('');
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full transition-all duration-200 ease-in-out rounded-full',
          className
        )}
      >
        <div
          className={cn(
            'overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed',
            {
              open: displayMobileSearch,
            }
          )}
          onClick={() => clear()}
        />
        {/* End of overlay */}

        <div className="relative z-30 flex flex-col justify-center w-full shrink-0 rounded-full">
          <div className="flex flex-col w-full mx-auto rounded-full">
            <SearchBox
              searchId={searchId}
              name="search"
              value={search_input}
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={clear}
              onFocus={() => enableInputFocus()}
              variant={variant}
            />
          </div>
          {/* End of searchbox */}

          {/* {isLoading ? (
            <div className="w-full absolute top-[56px] ltr:left-0 rtl:right-0 py-2.5 bg-brand-light rounded-md flex flex-col overflow-hidden shadow-dropDown z-30">
              <div className="w-full h-[380px]">
                <div
                  key={`search-result-loader-key-${1}`}
                  className="py-2.5 ltr:pl-5 rtl:pr-5 ltr:pr-10 rtl:pl-10 scroll-snap-align-start"
                >
                  <SearchResultLoader key={1} uniqueKey={`top-search-${1}`} />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    );
  }
);

Search.displayName = 'Search';
export default Search;
