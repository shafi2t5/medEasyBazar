import Link from 'next/link';
import Image from '@components/ui/image';
import { IoIosArrowForward } from 'react-icons/io';
import { Category } from '@framework/types';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useUI } from '@contexts/ui.context';
// import { UIContext } from '@contexts/ui.context';
// import { useContext } from 'react';

interface Props {
  category: any;
  href: LinkProps['href'];
  className?: string;
  variant?: 'default' | 'small';
}

const CategoryListCard: React.FC<Props> = ({
  category,
  className,
  href,
  variant = 'default',
}) => {
  const { name, icon, slug } = category;
  const { t } = useTranslation('common');
  // const { selectCategory } = useContext(UIContext);
  const {
    setCategoryList,
    setCategoryLimit,
    setCategoryName,
    categoryName,
    setSearchList,
    setSearchInput,
  } = useUI();
  const router = useRouter();
  return (
    <div
      onClick={() => {
        if (slug !== categoryName) {
          setCategoryLimit(0);
          setCategoryList([]);
        }
        setSearchInput('');
        setSearchList([]);
        setCategoryName(slug);
        router.push(href);
      }}
    >
      <a
        className={cn(
          'group flex justify-between items-center px-3.5 2xl:px-4 transition cursor-pointer',
          {
            'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3': variant === 'default',
            'py-2 3xl:py-3': variant === 'small',
          },
          className
        )}
      >
        <div className="flex items-center">
          <div
            className={cn('inline-flex shrink-0 w-9 h-9', {
              '2xl:w-12 3xl:w-auto 2xl:h-12 3xl:h-auto': variant === 'default',
            })}
          >
            <Image
              src={icon ?? '/assets/images/category/cookies-biscuits.png'}
              alt={name || t('text-category-thumbnail')}
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-15px text-brand-dark capitalize ltr:pl-2.5 rtl:pr-2.5  md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-5">
            {name}
          </h3>
        </div>
        <div className="flex items-center transition-all transform group-hover:translate-x-1">
          <IoIosArrowForward className="text-base text-brand-dark text-opacity-40" />
        </div>
      </a>
    </div>
  );
};

export default CategoryListCard;
