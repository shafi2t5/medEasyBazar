import Layout from '@components/layout/layout-doctor';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
// import { fetchCategories } from '@framework/category/get-all-categories';
import DoctorList from '@components/doctor/doctorList';
import { GetServerSideProps } from 'next';

export default function Doctor({ dept }: { dept: string }) {
  return (
    <>
      <Seo
        title="Grocery & Food Store React Template"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/"
      />
      <DoctorList dept={dept} />
    </>
  );
}

Doctor.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dept: query?.dept,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
