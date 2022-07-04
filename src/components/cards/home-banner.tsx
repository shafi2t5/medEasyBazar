import Carousel from '@components/ui/carousel/carousel';
import { useBannerQuery } from '@framework/banner/get-all-banner';
import { SwiperSlide } from 'swiper/react';
import BannerCard from './banner-card';

interface BannerProps {
  className?: string;
}

const breakpoints = {
  '0': {
    slidesPerView: 1,
  },
};

const HomeBanner: React.FC<BannerProps> = ({ className }) => {
  const { data, isLoading } = useBannerQuery();
  return (
    <>
      <Carousel
        autoplay={false}
        breakpoints={breakpoints}
        buttonSize={'default'}
        prevActivateId="all-banner-carousel-button-prev"
        nextActivateId="all-banner-carousel-button-next"
      >
        {data?.map((banner: any) => (
          <SwiperSlide key={`all-banner--key${banner.id}`}>
            <BannerCard banner={banner} className="" />
          </SwiperSlide>
        ))}
      </Carousel>
    </>
  );
};

export default HomeBanner;
