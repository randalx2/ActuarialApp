import { useQuery } from 'react-query'
import useABTestingApi from './useABTestingApi'
import { AxiosResponse } from 'axios'

type ChangelogResponseModel = {
  changelogId: number
  actuarialId: number
  name: string
  email: string
  modifiedDate: string
}

function useFetchChangelogs(actuarialId: number) {
  const api = useABTestingApi()

  const fetchChangelogs = async (): Promise<ChangelogResponseModel[]> => {
    const response = await api.getApi(`/changelogs/${actuarialId}`)()
    // Handling the response with an explicit type
    return (response as AxiosResponse<ChangelogResponseModel[]>).data
  }

  return useQuery(['changelogs', actuarialId], fetchChangelogs)
}

export default useFetchChangelogs
