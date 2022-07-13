import Header from '@components/layout/header/header-six';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import Container from '@components/ui/container';
import { useUI } from '@contexts/ui.context';
import SearchData from '@components/search/searchData';
import DoctorListCard from '@components/cards/doctor-list-card';
import { useDepartmentsQuery } from '@framework/doctor/get-all-departments';

const Layout: React.FC = ({ children }) => {
  const { searchList, search_input } = useUI();
  const { data } = useDepartmentsQuery();

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
              <div className="bg-brand-sidebarColor flex flex-col justify-between border rounded-md border-border-base">
                {data?.data?.departments?.map((dept: any, index: any) => (
                  <DoctorListCard
                    key={`category--key-${dept.id}`}
                    dept={dept}
                    href={'/'}
                    className="transition"
                    variant="small"
                    index={index}
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
