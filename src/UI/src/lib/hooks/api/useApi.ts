import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useCallback, useMemo } from 'react';
// import { useOktaAuth } from '@okta/okta-react';

function useApi<ResponseData = unknown, RequestData = unknown>(baseURL: string) {
  // const { oktaAuth } = useOktaAuth(); // Temporarily commented out

  const request = useCallback(
    (url: string, config: AxiosRequestConfig<RequestData>) => {
      // Temporarily disable accessToken logic
      // const accessToken = oktaAuth.getAccessToken();

      // if (!accessToken) {
      //   oktaAuth.signOut();
      //   return Promise.reject('Session expired');
      // }

      return axios.request<ResponseData, AxiosResponse<ResponseData>, RequestData>({
        ...config,
        // headers: { Authorization: `Bearer ${accessToken}` }, // Temporarily commented out
        baseURL,
        url,
        withCredentials: true,
      });
    },
    [baseURL] // Removed oktaAuth from dependencies
  );

  return useMemo(() => {
    const requestByMethod =
      (method: Method) =>
      (url: string, apiConfig: AxiosRequestConfig = {}) =>
      () =>
        request(url, { ...apiConfig, method });

    const requestByDataAndMethod =
      (method: Method) =>
      (url: string, apiConfig: AxiosRequestConfig<RequestData> = {}) =>
      (data: RequestData) =>
        request(url, { ...apiConfig, method, data });

    return {
      baseURL,
      getApi: requestByMethod('get'),
      postApi: requestByDataAndMethod('post'),
      putApi: requestByDataAndMethod('put'),
      patchApi: requestByDataAndMethod('patch'),
      deleteApi: requestByDataAndMethod('delete'),
    };
  }, [baseURL, request]);
}

export default useApi;
