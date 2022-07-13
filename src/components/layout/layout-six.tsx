import { useSessionStorage } from 'react-use';
// import Link from '@components/ui/link';
// import HighlightedBar from '@components/common/highlighted-bar';
import Header from '@components/layout/header/header-six';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
// import { IoChevronForwardCircleOutline } from 'react-icons/io5';
// import { useTranslation } from 'next-i18next';
import { ROUTES } from '@utils/routes';
// import { LIMITS } from '@framework/utils/limits';
// import { useCategoriesQuery } from '@framework/category/get-all-categories';
import CategoryListCard from '@components/cards/category-list-card';
import Container from '@components/ui/container';
import { useHomeProductsQuery } from '@framework/product/get-all-best-seller-products';
import { useUI } from '@contexts/ui.context';
// import { ProductGrid } from '@components/product/product-grid';
import SearchData from '@components/search/searchData';

const Layout: React.FC = ({ children }) => {
  // const { t } = useTranslation('common');
  // const [highlightedBar, setHighlightedBar] = useSessionStorage(
  //   'borobazar-highlightedBar',
  //   'false'
  // );
  const { searchList, search_input } = useUI();

  // const { data } = useCategoriesQuery({
  //   limit: LIMITS.CATEGORIES_LIMITS,
  // });

  const { data } = useHomeProductsQuery();

  const categories = data?.medicine_homepage_products?.map((product, index) => {
    return {
      name: product.title,
      slug: product.title,
      icon: null,
      id: index,
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* {highlightedBar !== 'true' && (
        <HighlightedBar
          onClose={() => setHighlightedBar('true')}
          className="text-brand-light]"
        >
          <div className="text-sm font-medium py-0.5 ltr:pr-6 rtl:pl-6">
            <span>
              {t(
                '35% Exclusive discount plus free next day delivery, excludes sale'
              )}
              <Link
                href="#"
                className="opacity-80 inline-flex text-xs uppercase font-bold ltr:pl-1.5 rtl:pr-1.5 items-center relative transition-all hover:opacity-100"
              >
                <span className="border-b border-brand-light inline-block pb-0.5">
                  Learn More
                </span>
                <IoChevronForwardCircleOutline className="text-xl ltr:ml-1 rtl:mr-1 relative -top-0.5" />
              </Link>
            </span>
          </div>
        </HighlightedBar>
      )} */}
      {/* End of highlighted bar  */}

      <Header />

      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Container className="w-full h-full">
          <div className={`xl:flex md:pb-2.5 pt-4`}>
            <div className="hidden xl:block shrink-0 ltr:pr-8 rtl:pl-8 xl:w-[320px] 2xl:w-[370px] pt-px">
              <div className="bg-brand-sidebarColor flex flex-col justify-between border rounded-md border-border-base lg:sticky lg:top-24">
                {categories?.map((category) => (
                  <CategoryListCard
                    key={`category--key-${category.id}`}
                    category={category}
                    href={{
                      pathname: ROUTES.CATEGORY,
                      query: { category: category.slug },
                    }}
                    className="transition"
                    variant="small"
                  />
                ))}
              </div>
            </div>
            {search_input && searchList?.length > 0 ? (
              <SearchData />
            ) : (
              <div className="w-full trendy-main-content">{children}</div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
