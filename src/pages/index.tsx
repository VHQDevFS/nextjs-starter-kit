import { GetStaticProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { MainLayout } from '@/components/layout';
import { API_URL } from '@/configs';
import { localesPath } from '@/libs/locales';

import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common');

  return (
    <div>
      {t('hello')} from HOME PAGE with api {API_URL} and language: {language}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = '' }) => ({
  props: {
    ...(await serverSideTranslations(locale, localesPath)),
    // ..more props pass to page here
  },
});

Home.getLayout = function (page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
