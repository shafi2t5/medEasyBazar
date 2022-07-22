import Image from '@components/ui/image';
import { IoIosArrowForward } from 'react-icons/io';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { LinkProps } from 'next/link';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import { fetchDoctorList } from '@framework/doctor/use-doctor';
import { useState } from 'react';
interface Props {
  dept: any;
  href?: LinkProps['href'];
  className?: string;
  variant?: 'default' | 'small';
  index: number;
}

const DoctorListCard: React.FC<Props> = ({
  dept,
  className,
  variant = 'default',
  index,
}) => {
  const { t } = useTranslation('common');
  const { setDoctorInput, setDoctorList } = useUI();
  const history = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div
      onClick={async () => {
        const data = await fetchDoctorList({
          text: dept?.department_en,
          setIsLoading,
        });

        setDoctorList(data?.doctors);
        setDoctorInput(dept?.department_en);
        history.push(`${ROUTES.DOCTOR}?dept=${dept?.department_en}`);
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
              src={
                `${process?.env?.NEXT_PUBLIC_ASSETS_API_ENDPOINT}/${dept?.department_image}` ??
                '/assets/images/category/cookies-biscuits.png'
              }
              alt={dept?.department_en || t('text-category-thumbnail')}
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-15px text-brand-dark capitalize ltr:pl-2.5 rtl:pr-2.5  md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-5">
            {dept?.department_en}
          </h3>
        </div>
        <div className="flex items-center transition-all transform group-hover:translate-x-1">
          <IoIosArrowForward className="text-base text-brand-dark text-opacity-40" />
        </div>
      </a>
    </div>
  );
};

export default DoctorListCard;
