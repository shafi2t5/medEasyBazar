import ArrowIcon from '@components/icons/arrow-icon';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useUI } from '@contexts/ui.context';

interface Props {
  className?: string;
  href?: LinkProps['href'];
  slug?: string;
}

const SeeAll: React.FC<Props> = ({ className, href = '/', slug }) => {
  const { setCategoryList, setCategoryLimit, setCategoryName, categoryName } =
    useUI();
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <div
      onClick={() => {
        if (slug !== categoryName) {
          setCategoryLimit(0);
          setCategoryList([]);
        }
        setCategoryName(slug);
        router.push(href);
      }}
      className={`${className} cursor-pointer p-4 flex items-center justify-center flex-col hover:opacity-80`}
    >
      <ArrowIcon color="#02B290" className="w-10" />
      <span className="font-semibold text-sm sm:text-base text-brand block pt-1.5 sm:pt-3.5">
        {t('text-see-all')}
      </span>
    </div>
  );
};

export default SeeAll;
