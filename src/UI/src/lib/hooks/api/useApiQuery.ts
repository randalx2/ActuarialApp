
import { AxiosRequestConfig } from 'axios'
import { useCallback } from 'react'
import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import useApi from './useApi'

export const isQueryEnabled = (enabled?: boolean) => enabled === undefined || !!enabled

export type UseApiQueryOptions<TQueryFnData = unknown, TData = TQueryFnData, TError = unknown> = {
  axiosConfig?: AxiosRequestConfig
} & UseQueryOptions<TQueryFnData, TError, TData>

export const useApiQuery = <TQueryFnData = unknown, TData = TQueryFnData, TError = unknown>(
  queryBaseUrl: string,
  queryEndpoint: string,
  queryKey: QueryKey,
  queryOptions?: UseApiQueryOptions<TQueryFnData, TData, TError>
) => {
  const { getApi } = useApi<TQueryFnData>(queryBaseUrl)
  const queryFn = useCallback(
    () => getApi(queryEndpoint, queryOptions?.axiosConfig)().then(res => res.data),
    [getApi, queryEndpoint, queryOptions?.axiosConfig]
  )

  return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false, ...queryOptions })
}
