export type EmptyObjectType = Record<string, never>;

export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>;

export interface IDataResponse<TData = unknown> {
  data: TData;
  code: number;
  message: string;
  success: boolean;
  statusCode?: number;
}

export interface TBaseEntity {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TBasePagination {
  page: number;
  limit: number;
  count: number;
}
