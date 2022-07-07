import Link from '@components/ui/link';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  href: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
}

const AuthMenu: React.FC<Props> = ({
  isAuthorized,
  href,
  btnProps,
  children,
}) => {
  const { setSearchList, setSearchInput } = useUI();
  const router = useRouter();
  return isAuthorized ? (
    <div
      className="text-sm cursor-pointer font-normal lg:text-15px text-brand-dark md:text-brand-light focus:outline-none ml-0 lg:ml-2 rtl:mr-2"
      onClick={() => {
        setSearchInput('');
        setSearchList([]);
        router.push(href);
      }}
    >
      {children}
    </div>
  ) : (
    <button
      className="text-sm font-normal lg:text-15px text-brand-dark md:text-brand-light focus:outline-none ml-0 lg:ml-2 rtl:mr-2"
      aria-label="Authentication"
      {...btnProps}
    />
  );
};

export default AuthMenu;
