import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 100
  },
  modal: {
    border: 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    padding: 0,
    width: '60%',
    overflow: 'auto',
    zIndex: 101,
    maxWidth: '60rem',
    maxHeight: '90vh',
    backgroundColor: theme.palette.type === 'dark' ? '#424242' : '#f5f5f5',
    color: theme.palette.type === 'dark' ? '#fff' : '#000'
  }
}))

function Modal({ children, onClose }) {
  const classes = useStyles()

  function backdropClickHandler(event) {
    event.stopPropagation()
    onClose()
  }

  return (
    <>
      <div className={classes.backdrop} onClick={backdropClickHandler} />
      <dialog open className={classes.modal} onClick={e => e.stopPropagation()}>
        {children}
      </dialog>
    </>
  )
}

export default Modal
