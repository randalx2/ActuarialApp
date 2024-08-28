import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  step: {
    '& $completed': {
      color: '#34B468'
    },
    '& $active': {
      color: '#337d9e'
    }
  },
  completed: {},
  active: {},
  label: {
    fontWeight: 'normal',
    '&$activeLabel': {
      fontWeight: 'bold'
    }
  },
  activeLabel: {},
  stepButton: {
    pointerEvents: 'none', // Disables the button from being clickable
    '& .MuiStepLabel-label': {
      cursor: 'default' // Ensures the cursor is the default style
    }
  }
})

const HorizontalStepper = props => {
  const classes = useStyles()
  const activeStep = props.activeStep || 0
  const steps = props.stepTitles

  return (
    <div className={classes.root}>
      <Stepper
        id={`${props.form}_stepper`}
        style={{ backgroundColor: 'transparent' }}
        alternativeLabel
        activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            classes={{
              root: classes.step,
              completed: classes.completed
            }}>
            <StepButton classes={{ root: classes.stepButton }}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: classes.step,
                    completed: classes.completed,
                    active: activeStep === index ? classes.active : ''
                  }
                }}>
                <Typography
                  variant="subtitle2"
                  className={`${classes.label} ${activeStep === index ? classes.activeLabel : ''}`}>
                  {label}
                </Typography>
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default HorizontalStepper
