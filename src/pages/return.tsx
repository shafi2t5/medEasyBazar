import Layout from '@components/layout/layout-six';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import { returnPolicy } from '@settings/return-policy';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
// import DownloadApps from '@components/common/download-apps';
import Heading from '@components/ui/heading';
import Seo from '@components/seo/seo';

export default function ReturnPolicyPage() {
  const { t } = useTranslation('return');

  return (
    <>
      <Seo
        title="Return Policy"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="terms"
      />
      <PageHeroSection heroTitle="text-page-return-policy" />
      <div className="py-12 lg:py-16 2xl:py-20">
        <Container>
          <div className="w-full xl:max-w-[1200px] mx-auto">
            {returnPolicy?.map((item) => (
              // @ts-ignore
              <div
                key={item.title}
                className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
              >
                <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                  {item.title}
                </Heading>
                <div
                  className="text-brand-muted text-sm lg:text-15px leading-7 space-y-5"
                  dangerouslySetInnerHTML={{
                    __html: t(item.description),
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 font-bold text-base ">
            For all the above scenarios, the refund amount will be sent to
            MedEasy wallet of the customer. And the balance can only be used to
            purchase at MedEasy. Upon customers request, MedEasy will transfer
            the refund amount to the users original payment source within 7
            days. Refund is only allowed for customers who have paid via bKash
            or card or other electronic method. For the orders that are paid via
            Cash, refund is only to be given through MedEasy wallet.
          </div>
        </Container>
      </div>
      {/* <DownloadApps /> */}
    </>
  );
}

ReturnPolicyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'terms',
        'footer',
      ])),
    },
  };
};
