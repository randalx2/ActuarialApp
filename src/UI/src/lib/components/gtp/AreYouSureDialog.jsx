import React from 'react'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import SimpleDialog from './SimpleDialog'

function AreYouSureDialog({
  open,
  title,
  message,
  onAccept,
  acceptButtonText,
  onClose,
  disableSubmit,
  errorMessage
}) {
  return (
    <SimpleDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      title={title}
      content={
        <>
          <DialogContent>
            <DialogContentText style={{ minWidth: '400px' }} id="alert-dialog-description">
              {message}
            </DialogContentText>
            {errorMessage && (
              <DialogContentText style={{ color: 'red', marginTop: '20px' }}>
                {errorMessage}
              </DialogContentText>
            )}
          </DialogContent>
        </>
      }
      actions={
        <>
          <Button
            onClick={event => {
              event.stopPropagation()
              onClose()
            }}
            color="primary">
            Cancel
          </Button>
          <Button
            disabled={disableSubmit}
            onClick={event => {
              event.stopPropagation()
              onAccept()
            }}
            variant="contained"
            color="primary"
            autoFocus>
            {acceptButtonText ?? 'Accept'}
          </Button>
        </>
      }
    />
  )
}

export default AreYouSureDialog
