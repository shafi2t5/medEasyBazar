import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  className?: string;
  thumbnailClassName?: string;
  href: LinkProps['href'];
  bundle: {
    image: string;
    title: string;
    description?: string;
    bgColor?: string;
  };
}

const BundleCard: React.FC<Props> = ({
  bundle,
  imgWidth = 60,
  imgHeight = 60,
  className = '',
  thumbnailClassName = 'ltr:pr-7 rtl:pl-5 2xl:ltr:pr-7 2xl:rtl:pl-5',
  href,
}) => {
  const { image, title, description, bgColor } = bundle;
  const { t } = useTranslation('common');
  return (
    <Link href={href} className={cn('group flex', className)}>
      <div
        className="rounded-[20px] relative flex items-center justify-center w-full overflow-hidden p-6"
        style={{ backgroundColor: bgColor }}
      >
        <div className={cn('', thumbnailClassName)}>
          <Image
            src={image ?? '/assets/placeholder/collection.svg'}
            alt={t(title) || t('text-card-thumbnail')}
            width={imgWidth}
            height={imgHeight}
            className="object-cover transition duration-200 ease-in-out transform bg-sink-thumbnail group-hover:scale-105"
          />
        </div>
        <div className="py-3 lg:py-5 ltr:pr-4 rtl:pl-4 lg:ltr:pr-3 lg:rtl:pl-3 xl:ltr:pr-4 xl:rtl:pl-4">
          <Heading variant="heading" className="mb-[5px] text-brand-light">
            {t(title)}
          </Heading>
          <button
            type="button"
            className="mt-1 text-sm py-1 px-2 font-semibold rounded-lg bg-brand-light text-brand-navColor ltr:ml-1 rtl:mr-1 sm:text-base hover:no-underline focus:outline-none"
          >
            {t(`${description}`)}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BundleCard;
