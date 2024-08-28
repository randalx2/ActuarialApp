import React, { useState, useEffect } from 'react'
import ActuarialWizard from '../components/ActuarialWizard/ActuarialWizard'
import { useLocation } from 'react-router-dom'
import Spacer from '../components/Spacer'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import TextWithHelp from '../components/TextWithHelp'
import { ActuarialLinks } from '../enums/linkEnums'

const useStyles = makeStyles(theme => ({
  wizardContainer: {
    maxWidth: '60rem',
    margin: '0 auto', // Reduce the top margin to 0.5rem
    //padding: '1rem 0',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
    justifyContent: 'center'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  button: {
    margin: theme.spacing(1)
  },
  backButton: {
    background: '#d3494e',
    color: '#ffffff',
    '&:hover': {
      background: '#e50000'
    }
  },
  nextButton: {
    background: '#337d9e',
    color: '#ffffff',
    '&:hover': {
      background: '#23576e'
    }
  },
  intro: {
    maxWidth: '60rem',
    margin: '0 auto 0 auto', // Reduce the bottom margin to 0
    //padding: '1rem 0',
    display: 'list',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: theme.spacing(0)
  }
}))

function NewActuarial() {
  const location = useLocation()
  const classes = useStyles()
  const [actProps, setActProps] = useState(location.state ? location.state.actProps : undefined)
  const [loading, setLoading] = useState(!actProps)
  const helpLink = ActuarialLinks.HELP

  useEffect(() => {
    if (!actProps) {
      // Simulate fetching Actuarial data, replace with your actual fetch call
      setTimeout(() => {
        setActProps({
          /* fetched data */
        })
        setLoading(false)
      }, 2000)
    }
  }, [actProps])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div className={classes.wizardContainer}>
      <div className={classes.intro}>
        <Spacer height={3} />
        <TextWithHelp title="Create Actuarial Data Wizard" link={helpLink} />
        <Spacer height={1} />
        <Typography variant="body2" gutterBottom>
          Use the wizard to successfully setup your Actuarial Data.
        </Typography>
        <Spacer height={1} />
      </div>
      <ActuarialWizard isUpdate={false} actProps={actProps} />
    </div>
  )
}

export default NewActuarial
