import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, TextField, Checkbox, Paper } from '@material-ui/core'
import ValidationRegex from './ValidationRegex'
import TreatmentsTable from './TreatmentsTable'
import FormHeader from '../gtp/FormHeader'
import StepperButtons from '../gtp/StepperButtons'
import Spacer from '../Spacer'

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
    background: theme.palette.type === 'dark' ? '#424242' : '#ffffff', // Dark mode background
    color: theme.palette.type === 'dark' ? '#fff' : '#000', // Dark mode text color
    '& .MuiOutlinedInput-root': {
      color: theme.palette.type === 'dark' ? '#fff' : '#000', // Dark mode text color
      '& fieldset': {
        borderColor:
          theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)' // Dark mode border color
      },
      '&.Mui-focused fieldset': {
        borderColor: '#337d9e' // Keep focus color the same
      },
      '&.Mui-error fieldset': {
        borderColor: '#ff0000' // Keep error color the same
      }
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)', // Dark mode label color
      '&.Mui-focused': {
        color: '#337d9e' // Keep focus color the same
      },
      '&.Mui-error': {
        color: '#ff0000' // Keep error color the same
      }
    }
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
  addVariantButton: {
    background: '#00d26a',
    color: '#ffffff',
    '&:hover': {
      background: 'darkGreen'
    }
  },
  checkboxField: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1.875),
    '& .MuiCheckbox-root': {
      color: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)' // Dark mode checkbox color
    },
    '& .Mui-checked': {
      color: '#337d9e' // Keep checked color the same
    }
  },
  disabledCheckbox: {
    visibility: 'hidden' // Making disabled checkboxes invisible
  },
  hiddenCheckboxField: {
    display: 'none'
  },
  errorContainer: {
    margin: theme.spacing(2)
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px'
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
    textTransform: 'none',
    fontWeight: 'normal',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
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

const VariantDetails = ({
  nextStep,
  prevStep,
  formData,
  setFormData,
  isUpdate,
  actuarial,
  isVariantsModified,
  setVariantsModified,
  actProps
}) => {
  const classes = useStyles()
  const history = useHistory()
  const [variantLabelError, setVariantLabelError] = useState(false)
  const [variantLabelDuplicateError, setVariantLabelDuplicateError] = useState(false)
  const [labelValue, setLabelValue] = useState('')
  const [variantDescriptionError, setVariantDescriptionError] = useState(false)
  const [pickProbabilityPercentError, setPickProbabilityPercentError] = useState(false)
  const [controlError, setControlError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isControlAdded, setIsControlAdded] = useState(false)
  const [nextButtonTouched, setNextButtonTouched] = useState(false)

  const [variantListItem, setVariantListItem] = useState({
    label: '',
    description: '',
    pickProbabilityPercent: '',
    isControl: false
  })

  const [variantList, setVariantList] = useState([])

  // State variables to track the "touched" status of the fields
  const [variantLabelTouched, setVariantLabelTouched] = useState(false)
  const [variantDescriptionTouched, setVariantDescriptionTouched] = useState(false)
  const [pickProbabilityPercentTouched, setPickProbabilityPercentTouched] = useState(false)

  useEffect(() => {
    const sumPickProbability = variantList.reduce(
      (sum, variant) => sum + variant.pickProbabilityPercent,
      0
    )

    if (!isControlAdded && nextButtonTouched) {
      setErrorMessage('Must have a act default treatment')
    } else if (sumPickProbability !== 100 && nextButtonTouched) {
      setErrorMessage('The sum of pick probabilities must be equal to 100')
    } else if (variantList.length < 2 && nextButtonTouched) {
      setErrorMessage('Please add at least two variants')
    } else {
      setErrorMessage('')
    }
  }, [variantList, isControlAdded, nextButtonTouched])

  const isAddVariantButtonDisabled = () => {
    const pickProbability = parseInt(variantListItem.pickProbabilityPercent, 10)
    return (
      !variantListItem.label ||
      !variantListItem.description ||
      variantListItem.pickProbabilityPercent === '' ||
      isNaN(pickProbability) ||
      pickProbability < 0 ||
      pickProbability > 100 ||
      variantDescriptionError ||
      variantLabelError ||
      variantLabelDuplicateError
    )
  }

  useEffect(() => {
    if (
      isUpdate &&
      actuarial &&
      actuarial.variants &&
      actuarial.variants.length > 0 &&
      !isVariantsModified
    ) {
      setVariantList(actuarial.variants)
    } else {
      setVariantList(formData.variantRequestModels || [])
    }
  }, [isUpdate, actuarial, formData.variantRequestModels])

  // New useEffect hook to set isControlAdded based on variantList during component mount and variantList updates
  useEffect(() => {
    if (variantList && variantList.length > 0) {
      const controlCount = variantList.filter(item => item.isControl).length
      setIsControlAdded(controlCount > 0)
    }

    setVariantLabelDuplicateError(variantList.some(item => item.label === labelValue))

    //Re-enable checkbox if nothing in the table
    if (variantList.length === 0) {
      setIsControlAdded(false)
    }
  }, [variantList])

  const handleVariantListItemChange = e => {
    const { name, value } = e.target

    if (name === 'label') {
      setLabelValue(e.target.value)
      const isValid = ValidationRegex.label.test(e.target.value) && e.target.value.length < 30
      setVariantLabelError(!isValid)
      if (isValid)
        setVariantLabelDuplicateError(variantList.some(item => item.label === e.target.value))
    } else if (name === 'description') {
      const isValid = ValidationRegex.textField.test(e.target.value) && e.target.value.length < 1000
      setVariantDescriptionError(!isValid)
    } else if (name === 'pickProbabilityPercent') {
      const numericValue = value.replace(/\D/g, '') // Remove non-numeric characters
      const isValid = numericValue !== '' && numericValue > 0 && numericValue < 100
      setPickProbabilityPercentError(!isValid)

      setVariantListItem(prevItem => ({
        ...prevItem,
        [name]: numericValue
      }))
    } else {
      setVariantListItem(prevItem => ({
        ...prevItem,
        [name]: value
      }))
    }

    if (name !== 'pickProbabilityPercent') {
      setVariantListItem(prevItem => ({
        ...prevItem,
        [name]: value
      }))
    }
  }

  const handleReturn = () => {
    history.push(`/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials`)
  }

  const handleCheckboxChange = e => {
    const { checked } = e.target
    if (!checked || !isMultipleControls()) {
      setVariantListItem(prevItem => ({ ...prevItem, isControl: checked }))
    }
  }

  const isMultipleControls = () => {
    const controlCount = variantList.filter(item => item.isControl).length
    return controlCount > 1
  }

  const isValidVariantListItem = item => {
    return (
      item.label &&
      item.description &&
      item.pickProbabilityPercent &&
      Object.prototype.hasOwnProperty.call(item, 'isControl')
    )
  }

  const handleAddToVariantList = () => {
    if (isValidVariantListItem(variantListItem)) {
      const newItem = {
        ...variantListItem,
        pickProbabilityPercent: parseInt(variantListItem.pickProbabilityPercent) // Convert to int
      }

      setVariantList(prevList => [...prevList, newItem])

      // Reset variantListItem state
      setVariantListItem({
        label: '',
        description: '',
        pickProbabilityPercent: '',
        isControl: false
      })

      // Check if isControl is set to true
      if (newItem.isControl) {
        setIsControlAdded(true)
      }
    }

    setVariantsModified(true)
    setLabelValue('')
  }

  const handleVariantListRemove = index => {
    setVariantList(prevList => prevList.filter((_, i) => i !== index))

    // Check if the removed variant was a control variant
    if (variantList[index].isControl) {
      const remainingControlCount = variantList.filter(item => item.isControl).length

      // If there are no control variants left, re-enable the checkbox
      if (remainingControlCount === 0) {
        setIsControlAdded(false)
      }
    }

    setVariantsModified(true)
  }

  const validateNextButton = () => {
    const sumPickProbability = variantList.reduce(
      (sum, variant) => sum + variant.pickProbabilityPercent,
      0
    )

    return (
      (variantList.length >= 2 && sumPickProbability === 100 && isControlAdded) ||
      !nextButtonTouched
    )
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!nextButtonTouched) {
      setNextButtonTouched(true)
    }

    const sumPickProbability = variantList.reduce(
      (sum, variant) => sum + variant.pickProbabilityPercent,
      0
    )

    if (variantList.length < 2 || sumPickProbability !== 100 || !isControlAdded) {
      return
    }

    setControlError('')
    setErrorMessage('')
    setFormData({ ...formData, variantRequestModels: variantList })
    nextStep()
  }

  // function for back button
  const handleBack = e => {
    e.preventDefault()
    setFormData({ ...formData, variantRequestModels: variantList })
    prevStep()
  }

  const checkboxFieldClass =
    isControlAdded || isMultipleControls() ? classes.hiddenCheckboxField : classes.checkboxField

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <FormHeader variant="h3" title="Actuarial treatment details" />
        <TextField
          margin="normal"
          type="text"
          name="label"
          value={variantListItem.label}
          onChange={handleVariantListItemChange}
          label="Label"
          className={classes.textField}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
          onBlur={() => setVariantLabelTouched(true)}
          error={
            (variantLabelTouched && variantLabelError) ||
            (variantLabelTouched && variantLabelDuplicateError)
          }
          helperText={
            variantLabelTouched && variantLabelError
              ? 'No white spaces. More than one character. Less than 30 characters. Only lowercase characters and underscores.'
              : variantLabelTouched && variantLabelDuplicateError
              ? 'Variant labels must be unique.'
              : ''
          }
          InputProps={{
            endAdornment:
              variantLabelTouched && variantLabelError ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#ff0000',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                  !
                </div>
              ) : null
          }}
        />
        <Spacer height={2} />
        <TextField
          type="text"
          name="description"
          value={variantListItem.description}
          onChange={handleVariantListItemChange}
          label="Description"
          className={classes.textField}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          onBlur={() => setVariantDescriptionTouched(true)}
          error={variantDescriptionTouched && variantDescriptionError}
          helperText={
            variantDescriptionTouched && variantDescriptionError
              ? 'Only less than 1000 characters allowed. Some special characters not allowed. Cannot be empty or just whitespace.'
              : ''
          }
          InputProps={{
            endAdornment:
              variantDescriptionTouched && variantDescriptionError ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#ff0000',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                  !
                </div>
              ) : null
          }}
        />
        <Spacer height={2} />
        <TextField
          type="text"
          name="pickProbabilityPercent"
          value={variantListItem.pickProbabilityPercent}
          onChange={handleVariantListItemChange}
          label="Pick probability percentage"
          className={classes.textField}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
          onBlur={() => setPickProbabilityPercentTouched(true)}
          error={pickProbabilityPercentTouched && pickProbabilityPercentError}
          helperText={
            pickProbabilityPercentTouched && pickProbabilityPercentError
              ? 'Pick probability must be between 0 and 100. Positive numbers only.'
              : ''
          }
          InputProps={{
            endAdornment:
              pickProbabilityPercentTouched && pickProbabilityPercentError ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#ff0000',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                  !
                </div>
              ) : null
          }}
        />
        <div className={checkboxFieldClass}>
          <Checkbox
            checked={variantListItem.isControl}
            onChange={handleCheckboxChange}
            color="default"
            style={{
              color: variantListItem.isControl ? '#337d9e' : '#717373' // Use ternary to set color based on checked state
            }}
            disabled={isControlAdded || isMultipleControls()}
            className={isControlAdded ? classes.disabledCheckbox : ''}
          />
          <Typography variant="body1">Is act default</Typography>
        </div>
        <div style={{ width: '100%', textAlign: 'right' }}>
          <Button
            variant="contained"
            className={`${classes.button} ${classes.nextButton}`}
            onClick={handleAddToVariantList}
            disabled={isAddVariantButtonDisabled()}>
            Add treatment
          </Button>
        </div>
      </Paper>
      {errorMessage && (
        <div className={classes.errorContainer}>
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        </div>
      )}
      {controlError && <div className={classes.errorMessage}>{controlError}</div>}
      {variantList.length > 0 && (
        <div className={classes.tableContainer}>
          <FormHeader variant="h3" title="Actuarial treatments added:" />
          <Container withPaper={true}>
            <TreatmentsTable
              variantList={variantList}
              enableDelete={true}
              handleVariantListRemove={handleVariantListRemove}
              classes={{
                table: classes.table,
                tableHeaderCell: classes.tableHeaderCell,
                tableCell: classes.tableCell,
                deleteButton: classes.deleteButton
              }}
            />
          </Container>
        </div>
      )}

      <div className={classes.buttonGroup}>
        <StepperButtons
          backButtonState={false}
          nextButtonState={false}
          showSubmitButton={false}
          form="variantDetailsForm"
          showNextButton={true}
          backFunc={handleBack}
          nextFunc={handleSubmit}
          showCancelButton
          valid={validateNextButton()}
          cancelFunc={handleReturn}
          showBackButton={true}
        />
      </div>
    </form>
  )
}

export default VariantDetails