import { useMemo } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { useConfiguration } from '@gtp/plugins-core/hooks'; // Temporarily commented out
import useApi from './useApi';

type ABTestingApi = {
  baseURL: string;
  getApi: (url: string, config?: AxiosRequestConfig) => () => Promise<AxiosResponse<unknown>>;
  postApi: (url: string, config?: AxiosRequestConfig) => (data: unknown) => Promise<AxiosResponse<unknown>>;
  putApi: (url: string, config?: AxiosRequestConfig) => (data: unknown) => Promise<AxiosResponse<unknown>>;
  patchApi: (url: string, config?: AxiosRequestConfig) => (data: unknown) => Promise<AxiosResponse<unknown>>;
  deleteApi: (url: string, config?: AxiosRequestConfig) => (data: unknown) => Promise<AxiosResponse<unknown>>;
};

function useABTestingApi(): ABTestingApi {
  // Temporarily disable useConfiguration and use a hardcoded baseURL
  // const configuredHost = useConfiguration('abTesting.host');

  // Use a hardcoded fallback baseURL for offline testing
  const baseURL = 'http://localhost:6001/api/v1';

  const api = useApi(baseURL);

  // Memoize the object
  const memoizedApi = useMemo(() => {
    return {
      ...api,
    };
  }, [api]);

  return memoizedApi;
}

export default useABTestingApi;
