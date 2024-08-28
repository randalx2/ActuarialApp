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

function useFetchLatestChangelogAcrossActuarials(actuarialIds: number[]) {
  const api = useABTestingApi()

  const fetchLatestChangelog = async (): Promise<ChangelogResponseModel> => {
    // Correcting the call to match the expected signature
    const response = await api.postApi('/changelogs/latest')(actuarialIds)
    return (response as AxiosResponse<ChangelogResponseModel>).data
  }

  return useQuery(['latestChangelog', JSON.stringify(actuarialIds)], fetchLatestChangelog, {
    enabled: actuarialIds.length > 0
  })
}

export default useFetchLatestChangelogAcrossActuarials
