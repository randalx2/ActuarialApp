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

function useFetchLastChangelog(actuarialId: number) {
  const api = useABTestingApi()

  const fetchLastChangelog = async (): Promise<ChangelogResponseModel> => {
    const response = await api.getApi(`/changelogs/${actuarialId}/last`)()
    // Handling the response with an explicit type
    return (response as AxiosResponse<ChangelogResponseModel>).data
  }

  return useQuery(['lastChangelog', actuarialId], fetchLastChangelog)
}

export default useFetchLastChangelog
