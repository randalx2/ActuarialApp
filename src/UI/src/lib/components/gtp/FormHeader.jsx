import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    width: '100%',
    marginBottom: p => (p.gutterBottom ? theme.spacing(2) : null)
  },
  alignment: {
    marginLeft: 'auto'
  }
}))

const customStyle = theme => ({
  fontSize: '16px',
  color: theme.palette.type === 'dark' ? '#fff' : '#000'
})

function FormHeader({ id = '', title, variant = 'h3', gutterBottom = true }) {
  const classes = useStyles({ gutterBottom })
  const theme = useTheme()
  const style = customStyle(theme)

  return (
    <div className={classes.flex}>
      <Typography id={id} variant={variant} style={style}>
        {title}
      </Typography>
    </div>
  )
}

export default FormHeader
