import Layout from '@components/layout/layout-six';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { IoCheckmarkCircle } from 'react-icons/io5';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';

export default function PaymentSuccess() {
  const router = useRouter();

  const { t } = useTranslation('common');
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <>
      <Seo
        title="Grocery & Food Store React Template"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/"
      />
      <div className="col-span-full mb-7 lg:mb-8 xl:mb-9 2xl:mb-10">
        <div className="flex items-center justify-start px-4 py-4 mb-6 text-sm border rounded-md border-border-base bg-fill-secondary lg:px-5 text-brand-dark md:text-base lg:mb-8">
          <span className="flex items-center justify-center w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4 bg-brand bg-opacity-20 shrink-0">
            <IoCheckmarkCircle className="w-5 h-5 text-brand" />
          </span>
          {t('text-order-payment')}
        </div>

        <ul className="flex flex-col border rounded-md border-border-base bg-fill-secondary md:flex-row mb-7 lg:mb-8 xl:mb-10">
          <li className="px-4 py-4 text-base font-semibold border-b border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r border-border-two lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
            <span className="block text-xs font-normal leading-5 uppercase text-brand-muted">
              {t('text-order-number')}:
            </span>
            {router?.query?.orderId}
          </li>
          <li className="px-4 py-4 text-base font-semibold border-b border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r border-border-two lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
            <span className="block text-xs font-normal leading-5 uppercase text-brand-muted">
              {t('text-trans-number')}:
            </span>
            {router.query.transId}
          </li>
          <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
            <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
              {t('text-date')}:
            </span>
            {dayjs.utc(router?.query?.transDate).tz(dayjs.tz.guess()).date()}/
            {dayjs.utc(router?.query?.transDate).tz(dayjs.tz.guess()).month()}/
            {dayjs.utc(router?.query?.transDate).tz(dayjs.tz.guess()).year()}
          </li>
          <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
            <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
              {t('text-total')}:
            </span>
            {router.query.amount}
          </li>
          <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
            <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
              {t('text-payment-method')}:
            </span>
            {router.query?.cartType}
          </li>
        </ul>
      </div>
    </>
  );
}

PaymentSuccess.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
