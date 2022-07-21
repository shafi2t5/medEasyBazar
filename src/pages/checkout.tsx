import Layout from '@components/layout/layout-six';
import CheckoutCard from '@components/checkout/checkout-card';
import CheckoutDetails from '@components/checkout/checkout-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';

export default function CheckoutPage() {
  return (
    <>
      <Seo
        title="Checkout"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="checkout"
      />
      <div className="flex flex-col xl:max-w-screen-xl">
        <div className="flex flex-col flex-wrap grid-cols-1 gap-x-7 xl:gap-x-8 lg:grid lg:grid-cols-12">
          <div className="w-full col-start-1 col-end-9">
            <CheckoutDetails />
          </div>
          <div className="w-full col-start-9 col-end-13 mt-7 lg:mt-0">
            <CheckoutCard />
          </div>
        </div>
      </div>
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
