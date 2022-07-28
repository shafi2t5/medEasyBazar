import SectionHeader from '@components/common/section-header';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
// import { useCategoriesQuery } from '@framework/category/get-all-categories';
import Alert from '@components/ui/alert';
import CategoryListCard from '@components/cards/category-list-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useHomeProductsQuery } from '@framework/product/get-all-home-products';

interface CategoriesProps {
  className?: string;
}

const breakpoints = {
  '1480': {
    slidesPerView: 5,
  },
  '920': {
    slidesPerView: 3,
  },
  '600': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const CategoryGridListBlock: React.FC<CategoriesProps> = ({
  className = 'mb-7 lg:mb-8 xl:mb-9 2xl:mb-10',
}) => {
  const { width } = useWindowSize();
  // const { data, isLoading, error } = useCategoriesQuery({
  //   limit: 16,
  // });

  const { data, isLoading, error } = useHomeProductsQuery();

  const categories = data?.medicine_homepage_products?.map((product, index) => {
    return {
      name: product.title,
      slug: product.title,
      icon: null,
      id: index,
    };
  });

  return (
    <div className={cn(className)}>
      <div className="pt-0.5">
        <SectionHeader
          sectionHeading="text-choose-categories"
          sectionSubHeading="text-favorite-different-categories"
          headingPosition="left"
        />

        <div className="-mt-1.5 md:-mt-2">
          {error ? (
            <Alert message={error?.message} />
          ) : width! < 1280 ? (
            <>
              <Carousel
                breakpoints={breakpoints}
                grid={{ rows: 3, fill: 'row' }}
                className="-mx-1.5 md:-mx-2"
                prevButtonClassName="ltr:-left-2 rtl:-right-2 md:ltr:-left-2.5 md:rtl:-right-2.5"
                nextButtonClassName="ltr:-right-2 rtl:-left-2 lg:ltr:-right-2.5 lg:rtl:-left-2.5"
              >
                {isLoading && !data
                  ? Array.from({ length: 18 }).map((_, idx) => {
                      return (
                        <SwiperSlide
                          className="p-1.5 md:p-2"
                          key={`category--key-${idx}`}
                        >
                          <CategoryListCardLoader
                            uniqueKey={`category-card-${idx}`}
                          />
                        </SwiperSlide>
                      );
                    })
                  : categories?.map((category: any) => (
                      <SwiperSlide
                        key={`category--key-${category.id}`}
                        className="p-1.5 md:p-2"
                      >
                        <CategoryListCard
                          category={category}
                          href={{
                            pathname: ROUTES.CATEGORY,
                            query: { category: category.slug },
                          }}
                          className="rounded-md text-brand-light"
                        />
                      </SwiperSlide>
                    ))}
              </Carousel>
            </>
          ) : (
            <div className="flex-wrap justify-center -mx-1 xl:flex">
              {isLoading && !data
                ? Array.from({ length: 18 }).map((_, idx) => {
                    return (
                      <div
                        key={`category--key-${idx}`}
                        className="w-[25%] 2xl:w-[20%] 3xl:w-[16.666%] shrink-0 p-2"
                      >
                        <CategoryListCardLoader
                          uniqueKey={`category-card-${idx}`}
                        />
                      </div>
                    );
                  })
                : categories?.map((category: any) => (
                    <div
                      key={`category--key-${category.id}`}
                      className="w-[25%] 2xl:w-[20%] 3xl:w-[16.666%] shrink-0 p-2"
                    >
                      <CategoryListCard
                        category={category}
                        href={{
                          pathname: ROUTES.CATEGORY,
                          query: { category: category.slug },
                        }}
                        className="rounded-md text-brand-light"
                      />
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryGridListBlock;
