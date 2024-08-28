import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import useFormSubmissionState from './useFormSubmissionState'

const Save = ({
  form,
  label,
  disabled,
  className,
  allowDirtySubmit,
  allowPristineSubmit,
  onClick
}) => {
  const { canSave, submitting } = useFormSubmissionState(
    form,
    allowDirtySubmit,
    allowPristineSubmit
  )

  return (
    <Button
      id={`${form}_save`}
      aria-label={`${label || 'Save'} ${form}`}
      className={className}
      variant="contained"
      color="primary"
      disabled={disabled || !canSave}
      onClick={onClick}>
      {submitting && <CircularProgress size={20} style={{ marginRight: 10 }} />}
      {label || 'Save'}
    </Button>
  )
}

export default Save
