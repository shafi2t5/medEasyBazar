import Image from 'next/image';
import cn from 'classnames';
import { siteSettings } from '@settings/site-settings';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  href = siteSettings.logo.href,
  ...props
}) => {
  const { setSearchList, setSearchInput } = useUI();
  const router = useRouter();
  return (
    <div
      className={cn('inline-flex focus:outline-none cursor-pointer', className)}
      {...props}
      onClick={() => {
        setSearchInput('');
        setSearchList([]);
        router.push(href);
      }}
    >
      <Image
        src={siteSettings.logo.url}
        alt={siteSettings.logo.alt}
        height={siteSettings.logo.height}
        width={siteSettings.logo.width}
        layout="fixed"
        loading="eager"
      />
    </div>
  );
};

export default Logo;
