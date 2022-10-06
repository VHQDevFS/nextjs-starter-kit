import { useQuery } from '@tanstack/react-query';

import { request } from '@/libs/api';
import { QueryConfig } from '@/libs/react-query';
import { ExtractFnReturnType } from '@/types/common.types';

import { IPost } from '../types';

export const getPostsList = () => request<{}, IPost[]>({ url: `posts`, method: 'get' });

type QueryPostsListType = typeof getPostsList;

interface IUseGetPostsListOptions {
  config?: QueryConfig<QueryPostsListType>;
}

export const useQueryGetPostsList = ({ config }: IUseGetPostsListOptions = {}) => {
  const { data, ...restResult } = useQuery<ExtractFnReturnType<QueryPostsListType>>({
    queryFn: getPostsList,
    queryKey: ['POST'],
    keepPreviousData: true,
    ...config,
  });

  return { post: data, ...restResult };
};

export const getPostById = (id: number) =>
  request<{}, IPost>({ url: `posts/${id}`, method: 'get' });

type QueryPostByIdType = typeof getPostById;

interface IUseGetPostByIdOptions {
  config?: QueryConfig<QueryPostByIdType>;
  id: number;
}

export const useQueryGetPostById = ({ config, id }: IUseGetPostByIdOptions) => {
  const { data, ...restResult } = useQuery<ExtractFnReturnType<QueryPostByIdType>>({
    queryFn: () => getPostById(id),
    queryKey: ['POST', id],
    enabled: !!id,
    keepPreviousData: true,
    ...config,
  });

  return { post: data, ...restResult };
};
