import React from 'react'
import { Grid, Tooltip } from '@material-ui/core'
import { IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'
import ExpansionPanel from './ExpansionPanel'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(0)
  },
  padded: {
    paddingBottom: theme.spacing(2)
  },
  contents: {
    width: '100%'
  },
  listItemIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    minWidth: '26px !important',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iconContainer: {
    justifyContent: 'flex-end'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const FlexGrow = () => {
  return <div style={{ flexGrow: 1 }} />
}

function Actuarial({ actuarial, actProps, onDelete, onDetails }) {
  const classes = useStyles()
  const history = useHistory()
  const isEditable = actProps.isProjectInDevelopment

  const handleUpdate = () => {
    history.push({
      pathname: `/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials/update-actuarial/${actuarial.actuarialId}`,
      state: {
        actuarial: actuarial,
        actProps: actProps
      }
    })
  }

  function renderDelete() {
    return (
      isEditable && (
        <Tooltip title="Delete" placement="left">
          <IconButton
            edge="end"
            size="large"
            color="default"
            onClick={() => onDelete(actuarial)}
            aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    )
  }

  function renderView() {
    return (
      <Tooltip title="View" placement="left">
        <IconButton
          edge="end"
          size="large"
          color="default"
          onClick={() => onDetails(actuarial)}
          aria-label="View">
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    )
  }

  function renderUpdate() {
    return (
      isEditable && (
        <Tooltip title="Update" placement="left">
          <IconButton
            edge="end"
            size="large"
            color="default"
            onClick={handleUpdate}
            aria-label="Update">
            <EditIcon />
          </IconButton>
        </Tooltip>
      )
    )
  }

  const SummaryComponent = (
    <>
      <div className={classes.header}>
        <div className={classes.flexContainer}>
          <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
            {actuarial.label}
          </Typography>
        </div>
        <FlexGrow />
      </div>
    </>
  )

  const DetailsComponent = (
    <>
      <div className={classes.padded}>
        <Typography variant="body1">{actuarial.description}</Typography>
      </div>
      <Grid container spacing={3} alignItems="center" className={classes.iconContainer}>
        {/* Action icons aligned to the right */}
        {isEditable ? (
          <>
            <Grid item>{renderView()}</Grid>
            <Grid item>{renderUpdate()}</Grid>
            <Grid item>{renderDelete()}</Grid>
          </>
        ) : (
          <Grid item>{renderView()}</Grid>
        )}
      </Grid>
    </>
  )

  return (
    <li className={classes.root}>
      <ExpansionPanel
        defaultExpanded
        summaryComponent={SummaryComponent}
        detailsComponent={DetailsComponent}
      />
    </li>
  )
}

export default Actuarial
