import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, IconButton, Tooltip } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'

const useStyles = makeStyles(theme => ({
  helpMeItem: {
    display: 'flex',
    alignItems: '',
    paddingRight: theme.spacing(2)
  },
  icon: {
    fontSize: 'large',
    color: theme.palette.primary.main
  },
  alignment: {
    display: 'flex',
    paddingLeft: theme.spacing(4),
    height: '25px'
  },
  iconButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: '0px'
  },
  tooltip: {
    backgroundColor: theme.palette.grey[600]
  }
}))

function TextWithHelp(props) {
  const classes = useStyles()

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
          {props.title}
        </Typography>
      </Grid>
      <Grid container xs={1} item className={classes.helpMeItem}>
        <div className={classes.alignment}>
          <Tooltip title="What is this?" placement="bottom" classes={classes.tooltip}>
            <IconButton
              className={classes.iconButton}
              color="primary"
              onClick={e => {
                e.preventDefault()
                window.open(props.link)
              }}>
              <HelpIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
    </Grid>
  )
}

export default TextWithHelp
