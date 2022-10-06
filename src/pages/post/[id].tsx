import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { MainLayout } from '@/components/layout';
import { getPostById, useQueryGetPostById } from '@/features';
import { localesPath } from '@/libs/locales';

import { NextPageWithLayout } from '../_app';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['POST', Number(id)], () => getPostById(Number(id)));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(context.locale ?? '', localesPath)),
    },
  };
};

const PostDetail: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter();

  const { post } = useQueryGetPostById({ id: Number(id) });
  const { t } = useTranslation('common');

  return (
    <div>
      {t('hello')}

      <p>{post?.body}</p>
    </div>
  );
};

PostDetail.getLayout = function (page) {
  return <MainLayout>{page}</MainLayout>;
};

export default PostDetail;
