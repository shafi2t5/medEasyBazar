import Header from '@components/layout/header/header-six';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import { ROUTES } from '@utils/routes';
// import { useCategoriesQuery } from '@framework/category/get-all-categories';
import CategoryListCard from '@components/cards/category-list-card';
import Container from '@components/ui/container';
import { useHomeProductsQuery } from '@framework/product/get-all-home-products';
import { useUI } from '@contexts/ui.context';
import SearchData from '@components/search/searchData';

const Layout: React.FC = ({ children }) => {
  const { searchList, search_input } = useUI();

  // const { data } = useCategoriesQuery();

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
              <div className="bg-brand-sidebarColor flex flex-col justify-between lg:sticky lg:top-24">
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
