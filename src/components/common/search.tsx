import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { fetchSearchedProducts } from '@framework/product/use-search';
import SearchBox from '@components/common/search-box';
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

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [limit, setLimit] = useState(0);
    const timeout = useRef<any>();
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

    async function handleAutoSearch(e: any) {
      setSearchInput(e.target.value);
      clearTimeout(timeout.current);
      if (e.target.value === '') {
        setSearchList([]);
      } else {
        timeout.current = setTimeout(async () => {
          const data = await fetchSearchedProducts({
            text: e.target.value,
            setIsLoading,
            limit,
            setLimit,
            isSearch: true,
          });

          setSearchList(data?.medicines);
        }, 600);
      }
    }
    function clear() {
      setSearchInput('');
      closeMobileSearch();
      closeSearch();
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
            'cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed',
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
              variant={variant}
            />
          </div>
        </div>
      </div>
    );
  }
);

Search.displayName = 'Search';
export default Search;
