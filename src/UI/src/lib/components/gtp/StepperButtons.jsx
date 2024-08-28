import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Save from './Save'

const styles = theme => ({
  button: {
    marginLeft: theme.spacing(1)
  },
  nextButton: {
    backgroundColor: '#337d9e',
    '&:hover': {
      backgroundColor: '#23576e', // Set the hex color code for hover background
      color: '#ffff'
    }
  },
  backButton: {
    color: '#337d9e'
  }
})

class StepperButtons extends React.PureComponent {
  static propTypes = {
    form: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    backButtonState: PropTypes.bool.isRequired,
    nextButtonState: PropTypes.bool.isRequired,
    showNextButton: PropTypes.bool.isRequired,
    nextButton: PropTypes.func,
    backFunc: PropTypes.func.isRequired,
    nextFunc: PropTypes.func.isRequired,
    showSubmitButton: PropTypes.bool.isRequired,
    submitButton: PropTypes.element,
    showCancelButton: PropTypes.bool.isRequired,
    cancelFunc: PropTypes.func.isRequired,
    showBackButton: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
  }

  render() {
    const {
      classes,
      backButtonState,
      nextButtonState,
      showNextButton,
      nextButton,
      backFunc,
      nextFunc,
      showSubmitButton,
      submitButton,
      showCancelButton,
      cancelFunc,
      showBackButton = true,
      valid
    } = this.props

    return (
      <>
        {showCancelButton && (
          <Button
            color="primary"
            onClick={cancelFunc}
            className={`${classes.button} ${classes.backButton}`}>
            Cancel
          </Button>
        )}
        {showBackButton && (
          <Button
            color="primary"
            disabled={backButtonState}
            onClick={backFunc}
            className={`${classes.button} ${classes.backButton}`}>
            Back
          </Button>
        )}
        {showNextButton &&
          (nextButton ? (
            nextButton({ nextFunc })
          ) : (
            <Button
              id="stepper_buttons_next"
              data-testid="stepper_buttons_next"
              disabled={!valid || nextButtonState}
              variant="contained"
              color="primary"
              onClick={nextFunc}
              className={`${classes.button} ${classes.nextButton}`}>
              Next
            </Button>
          ))}
        {showSubmitButton &&
          (submitButton || <Save form={this.props.form} label="Confirm and Submit" />)}
      </>
    )
  }
}

export default withStyles(styles)(StepperButtons)
