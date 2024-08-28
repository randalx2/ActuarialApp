import { useState, useMemo } from 'react'

const useFormSubmissionState = (form, allowDirtySubmit, allowPristineSubmit) => {
  const [submitting, setSubmitting] = useState(false)
  const [syncErrors, setSyncErrors] = useState({})
  const [asyncErrors, setAsyncErrors] = useState({})
  const [submitFailed, setSubmitFailed] = useState(false)

  const canSave =
    allowPristineSubmit ||
    (!submitting &&
      (Object.keys(syncErrors).length || Object.keys(asyncErrors).length || submitFailed))
  const canDiscard = Object.keys(syncErrors).length && !submitting

  const updateFormState = (newSubmitting, newSyncErrors, newAsyncErrors, newSubmitFailed) => {
    setSubmitting(newSubmitting)
    setSyncErrors(newSyncErrors)
    setAsyncErrors(newAsyncErrors)
    setSubmitFailed(newSubmitFailed)
  }

  return useMemo(
    () => ({ canSave, canDiscard, submitting, updateFormState }),
    [allowPristineSubmit, syncErrors, asyncErrors, submitFailed, submitting]
  )
}

export default useFormSubmissionState
