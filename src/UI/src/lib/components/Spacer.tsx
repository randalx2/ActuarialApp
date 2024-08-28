import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

type SpacerProps = { width?: number; height?: number }

const useStyles = makeStyles<Theme, SpacerProps>(theme => ({
  root: {
    width: p => theme.spacing(p.width || 0),
    height: p => theme.spacing(p.height || 0)
  }
}))

const Spacer = ({ width, height }: SpacerProps) => {
  const classes = useStyles({ width, height })
  return <div className={classes.root} />
}

export default Spacer
