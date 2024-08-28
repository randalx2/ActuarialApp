import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'
import { ActContext } from '../index'
import AreYouSureDialog from '../components/gtp/AreYouSureDialog'

function DeleteActuarial({ actuarial, api, onClose }) {
  const [errorMessage, setErrorMessage] = useState('')
  const actProps = useContext(ActContext)
  const history = useHistory()

  if (!actuarial) {
    return <CircularProgress />
  }

  const handleDelete = async () => {
    try {
      await api.deleteApi(`/Actuarials/${actuarial.actuarialId}`)()
      onClose()
      history.push(
        `/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials`
      )
    } catch (error) {
      console.error('Delete failed', error)
      const message =
        error.response && error.response.data
          ? error.response.data
          : 'Failed to delete the Actuarial Data. Please try again.'
      setErrorMessage(message)
    }
  }

  return (
    <AreYouSureDialog
      open={Boolean(actuarial)}
      title="Confirm delete"
      message="Are you sure you want to delete this Actuarial Data?"
      onAccept={handleDelete}
      acceptButtonText="Confirm delete"
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeleteActuarial
