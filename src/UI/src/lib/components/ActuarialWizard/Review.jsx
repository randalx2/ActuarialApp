import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Grid, FormControlLabel, Checkbox } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import FormHeader from '../gtp/FormHeader'
import StepperButtons from '../gtp/StepperButtons'
import useABTestingApi from '../../hooks/api/useABTestingApi' // Import the useABTestingApi hook
import TreatmentsTable from './TreatmentsTable'
import useCreateChangelog from '../../hooks/api/useCreateChangelog'
import Spacer from '../Spacer'
import ActuarialDistributionReview from './ActuarialDistributionReview'

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: theme.spacing(120),
    margin: '0 auto',
    padding: theme.spacing(1, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start'
  },
  title: {
    marginBottom: theme.spacing(2.5)
  },
  textField: {
    marginBottom: theme.spacing(1.875),
    background: '#ffffff'
  },
  dateTimePicker: {
    marginBottom: theme.spacing(1.875),
    width: '100%',
    background: '#ffffff'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(2.5)
  },
  button: {
    margin: theme.spacing(0, 0, 0, 2)
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
  table: {
    overflowX: 'initial',
    [theme.breakpoints.down('xs')]: {
      overflowX: 'auto'
    }
  },
  noRowsText: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    textAlign: 'center'
  },
  toolbar: {
    height: 'auto',
    padding: theme.spacing(0.5)
  },
  caption: {
    paddingRight: theme.spacing(1)
  },
  flex: {
    display: 'flex'
  },
  component: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: 'auto'
  },
  tableHeaderCell: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tableCell: {
    textTransform: 'none',
    fontWeight: 'normal',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: 'center'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  tableContainer: {
    marginTop: theme.spacing(2.5),
    width: '100%'
  },
  deleteButton: {
    color: theme.palette.error.main
  },
  errorContainer: {
    margin: theme.spacing(2)
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px'
  },
  disabledCheckbox: {
    color: '#bdbdbd !important'
  },
  reviewContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0)
  },
  reviewItem: {
    marginBottom: theme.spacing(1.875),
    display: 'flex',
    alignItems: 'center'
  },
  reviewLabel: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1.25),
    minWidth: theme.spacing(16.25)
  },
  reviewValue: {
    wordWrap: 'break-word' // Ensures text wraps at word boundaries
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  inset: {
    marginLeft: theme.spacing(4)
  },
  menuItem: {
    display: 'flex'
  },
  fullWidth: {
    width: '100%'
  },
  sourcingGroup: {
    margin: theme.spacing(2)
  },
  alert: {
    padding: theme.spacing(1.5),
    width: '100%',
    position: 'sticky'
  }
}))

const Container = ({ withPaper, children }) =>
  withPaper ? <Paper>{children}</Paper> : <div>{children}</div>

const Review = ({ prevStep, formData, isUpdate, actuarial, actProps }) => {
  const history = useHistory()
  const classes = useStyles()
  const [errorMessage, setErrorMessage] = useState('')
  const [acknowledged, setAcknowledged] = useState(false)

  // Destructuring mutate function from useCreateChangelog for creating a new changelog
  const { mutate: createChangelog } = useCreateChangelog()

  const { putApi, postApi } = useABTestingApi() // Create an instance of the useABTestingApi hook

  function displayData(title, value, size, variant) {
    if (!value || value.length === 0) return
    return (
      <Grid item xs={12} sm={size || 6}>
        <Typography variant={variant || 'subtitle2'}>{title}</Typography>
        <Typography variant="body1" className={classes.reviewValue}>
          {value}
        </Typography>
      </Grid>
    )
  }

  const handleReturn = () => {
    history.push(`/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials`)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const url = '/actuarials'

      let changelogData = {
        actuarialId: null, // This will be set upon successful creation
        name: actProps.name, // To come from GTP
        email: actProps.email, // To come from GTP
        modifiedDate: new Date().toISOString()
      }

      if (isUpdate && actuarial) {
        const actuarialUpdateRequestModel = {
          actName: actProps.actName,
          actuarialLabel: formData.actuarialLabel,
          actuarialDescription: formData.actuarialDescription,
          startDateTimeUtc: formData.startDateTimeUtc,
          endDateTimeUtc: formData.endDateTimeUtc,
          variantUpdateRequestModels: formData.variantRequestModels,
          actuarialType: formData.actuarialType,
          payoutUpdateRequestModels: formData.rtpSelection
        }

        // Send UPDATE request to the API endpoint with the request model as the JSON payload
        const putRequest = putApi(url + `/${actuarial.actuarialId}`)
        await putRequest(actuarialUpdateRequestModel)

        // Handle the response or show success message
        changelogData.ActuarialId = actuarial.actuarialId
        createChangelog(changelogData) // Create changelog entry after update
      } else {
        // Set the ActuarialRequestModel for the backend
        const actuarialRequestModel = {
          actId: actProps.actId,
          actName: actProps.actName,
          projectId: actProps.projectId,
          projectName: actProps.projectName,
          isProjectInDevelopment: actProps.isProjectInDevelopment,
          actuarialLabel: formData.actuarialLabel,
          actuarialDescription: formData.actuarialDescription,
          startDateTimeUtc: formData.startDateTimeUtc,
          endDateTimeUtc: formData.endDateTimeUtc,
          variantRequestModels: formData.variantRequestModels,
          actuarialType: formData.actuarialType,
          payoutRequestModels: formData.rtpSelection
        }

        const response = await postApi(url)(actuarialRequestModel) // Send POST request to the API endpoint with the request model as the JSON payload)

        changelogData.actuarialId = response.data.actuarialId // Correctly setting ActuarialId
        createChangelog(changelogData) // Log the creation action
      }

      //Refresh the main window with redirect routing
      history.push(
        `/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials`
      )
    } catch (error) {
      // Handle the error or show an error message
      console.error(error)

      // Check if the error response contains an error message
      if (error.response && error.response.data) {
        // Set the error message from the API response
        setErrorMessage(error.response.data)
      } else {
        // Set a generic error message
        setErrorMessage('An error occurred while submitting the form. Please try again.')
      }
    }
  }

  const acknowledgeCreation = () => {
    return (
      <Grid item xs={12} sm={12}>
        <FormControlLabel
          label={
            <Typography variant="h6" data-testid="review-checkbox">
              I confirm that I have reviewed the information supplied and understand that my
              Actuarial Data will be available within
              <strong> 5 minutes</strong> of submission.
            </Typography>
          }
          control={
            <Checkbox
              id="project-review-acknowledge-checkbox"
              onChange={e => setAcknowledged(e.target.checked)}
              color="primary"
            />
          }
        />
      </Grid>
    )
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch">
          {displayData(
            'Review',
            'Please confirm that the information displayed below is correct.',
            12,
            'h3'
          )}
          {displayData('Act name', formData.actName, 6)}
          {displayData('Actuarial Type', formData.actuarialType, 6)}
          {displayData('Actuarial label', formData.actuarialLabel)}
          {displayData('Actuarial description', formData.actuarialDescription)}
        </Grid>
      </Paper>

      <ActuarialDistributionReview rtpDistribution={formData.rtpSelection} />
      {/* Render the variants table if there are variants */}
      {formData.variantRequestModels.length > 0 && (
        <div className={classes.tableContainer}>
          <FormHeader variant="h3" title="Actuarial treatments:" />
          <Container withPaper={true}>
            <TreatmentsTable
              variantList={formData.variantRequestModels}
              enableDelete={false}
              classes={{
                table: classes.table,
                tableHeaderCell: classes.tableHeaderCell,
                tableCell: classes.tableCell
              }}
            />
          </Container>
        </div>
      )}
      {/* Render the error message if there is an error */}
      {errorMessage && (
        <div className={classes.errorContainer}>
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        </div>
      )}
      <Spacer height={2} />
      {acknowledgeCreation()}
      {/* Button group */}
      <div className={classes.buttonGroup}>
        <StepperButtons
          backButtonState={false}
          nextButtonState={false}
          showSubmitButton={false}
          form="reviewForm"
          valid={true}
          showNextButton={false}
          backFunc={prevStep}
          nextFunc={handleSubmit}
          showCancelButton
          cancelFunc={handleReturn}
          showBackButton={true}
        />
        <Button
          type="submit"
          variant="contained"
          className={`${classes.button} ${classes.nextButton}`}
          disabled={!acknowledged}>
          Confirm and submit
        </Button>
      </div>
    </form>
  )
}

export default Review
