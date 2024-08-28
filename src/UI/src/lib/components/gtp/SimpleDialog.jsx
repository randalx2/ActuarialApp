import { Dialog, Typography, useMediaQuery } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Close from '@material-ui/icons/Close'
import React from 'react'

const useStyles = makeStyles(theme => ({
  closeButton: { position: 'absolute', top: theme.spacing(1), right: theme.spacing(1) },
  actions: { padding: theme.spacing(2) }
}))

const SimpleDialog = ({
  open,
  onClose,
  title,
  content,
  actions,
  maxWidth = 'md',
  fullWidth = false,
  scroll = 'paper',
  componentFunc = null
}) => {
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const classes = useStyles()

  function onCloseDialog(event) {
    event.stopPropagation()
    onClose()
  }

  const CloseButton = () => (
    <IconButton
      className={classes.closeButton}
      edge="end"
      size="small"
      color="default"
      onClick={onCloseDialog}
      aria-label="Close">
      <Close />
    </IconButton>
  )

  function renderDialogContents() {
    return (
      <>
        <DialogTitle>
          <Typography variant="h3" component="span">
            {title}
          </Typography>
          <CloseButton />
        </DialogTitle>
        <Divider />
        <DialogContent>{content}</DialogContent>
        <Divider />
        <DialogActions className={classes.actions}>{actions}</DialogActions>
      </>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseDialog}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      scroll={scroll}
      // Do not remove. Event propagation from backdrop results in issues.
      disableBackdropClick
      maxWidth={maxWidth}>
      {componentFunc ? componentFunc(renderDialogContents()) : renderDialogContents()}
    </Dialog>
  )
}

export default SimpleDialog
