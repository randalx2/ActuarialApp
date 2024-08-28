import React from 'react'
import { InputAdornment, CircularProgress } from '@material-ui/core'
import Error from '@material-ui/icons/Error'

function ValidationAdornment(props) {
  if (props.isLoading) {
    return (
      <InputAdornment>
        <CircularProgress style={{ marginLeft: '10px' }} size={16} />
      </InputAdornment>
    )
  }

  if (props.hasError) {
    return (
      <InputAdornment position={props.validationPosition || 'start'}>
        <Error style={{ color: 'red' }} />
      </InputAdornment>
    )
  }

  return null
}

export default ValidationAdornment
