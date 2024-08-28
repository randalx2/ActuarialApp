import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(2)
  },
  rootNoPadding: {
    width: '100%'
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  content: {
    textAlign: 'center'
  }
}))

function AddItem(props) {
  const classes = useStyles()
  const { isDisabled } = props

  const renderButton = () => {
    return (
      <Tooltip
        title={isDisabled ? 'Project is not in development' : 'Create Actuarial Data'}
        placement="left">
        <span>
          {' '}
          {/* Span is needed because Tooltip does not work directly on disabled elements */}
          <IconButton
            id={props.id ? props.id : 'addItem'}
            onClick={props.onAdd}
            disableRipple
            disabled={isDisabled}>
            <AddCircleIcon
              className={classes.icon}
              color={isDisabled ? 'disabled' : 'primary'} // Change color based on isDisabled
              fontSize="large"
            />
          </IconButton>
        </span>
      </Tooltip>
    )
  }

  function renderWithPaper() {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.content}>{renderButton()}</div>
        </Paper>
      </div>
    )
  }

  function renderWithNoPaper() {
    return (
      <div className={classes.rootNoPadding}>
        <div className={classes.content}>{renderButton()}</div>
      </div>
    )
  }

  return props.withPaper ? renderWithPaper() : renderWithNoPaper()
}

export default React.memo(AddItem)
