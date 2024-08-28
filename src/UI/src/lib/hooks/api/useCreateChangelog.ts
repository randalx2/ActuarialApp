import { useMutation } from 'react-query'
import useABTestingApi from './useABTestingApi'
import { AxiosResponse } from 'axios'

type ChangelogRequestModel = {
  actuarialId: number
  name: string
  email: string
  modifiedDate: string
}

type ChangelogResponseModel = {
  changelogId: number
  actuarialId: number
  name: string
  email: string
  modifiedDate: string
}

function useCreateChangelog() {
  const api = useABTestingApi()

  const createChangelog = async (
    changelogData: ChangelogRequestModel
  ): Promise<ChangelogResponseModel> => {
    const response = await api.postApi('/changelogs')(changelogData)
    // Handling the response with an explicit type
    return (response as AxiosResponse<ChangelogResponseModel>).data
  }

  return useMutation(createChangelog)
}

export default useCreateChangelog
