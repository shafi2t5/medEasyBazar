import Link from '@components/ui/link';
import Image from 'next/image';
// import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';

interface BannerProps {
  banner: any;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
}

// function getImageHeight(deviceWidth: number) {
//   return deviceWidth < 480 ? 108 : 450;
// }

// function getImageWidth(deviceWidth: number) {
//   return deviceWidth < 480 ? 450 : 1840;
// }

const BannerCard: React.FC<BannerProps> = ({
  banner,
  className,
  variant = 'default',
  effectActive = true,
  classNameInner,
}) => {
  // const { width } = useWindowSize();
  const { type, title, image, body } = banner;
  // const selectedImage = getImageHeight(width!);

  return (
    <div className={cn('mx-auto', className)}>
      <Link
        href={'/'}
        className={cn(
          'h-full group flex justify-center relative overflow-hidden',
          classNameInner
        )}
      >
        <Image
          src={
            `${process?.env?.NEXT_PUBLIC_ASSETS_API_ENDPOINT}/${image}` ??
            '/assets/images/banner/banner-6.png'
          }
          width={1840}
          height={450}
          alt={title}
          quality={100}
          className={cn('bg-fill-thumbnail object-cover w-full', {
            'rounded-md': variant === 'rounded',
          })}
        />
        {effectActive && (
          <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
        )}
        {/* <div className="absolute top-1/4 left-[10%] max-w-xs flex flex-col items-center">
          <div className="text-base md:text-4xl text-brand-dark font-bold mb-2 text-center">
            {body}
            Take care of your dental health
          </div>
          <div className="text-brand-bannerText text-xs md:text-base border-2 border-stone-600 font-bold px-1 md:px-3 py-1 text-center inline-block">
            {title}
          </div>
        </div> */}
      </Link>
    </div>
  );
};

export default BannerCard;
