import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Paper, Typography, Grid, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import FormHeader from '../gtp/FormHeader';
import ValidationRegex from './ValidationRegex';
import StepperButtons from '../gtp/StepperButtons';
import Spacer from '../Spacer';
import CustomDatePicker from '../gtp/CustomDatePicker';

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
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  fullWidth: {
    width: '100%'
  },
  errorMessage: {
    color: 'red',
    marginBottom: theme.spacing(2),
  }
}));

const ActuarialDetails = ({
  nextStep,
  prevStep,
  formData,
  setFormData,
  isUpdate,
  actuarial,
  actProps
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [actuarialLabelTouched, setActuarialLabelTouched] = useState(false);
  const [actuarialDescriptionTouched, setActuarialDescriptionTouched] = useState(false);
  const [actuarialLabelError, setActuarialLabelError] = useState(false);
  const [actuarialDescriptionError, setActuarialDescriptionError] = useState(false);
  const [actuarialType, setActuarialType] = useState(formData.actuarialType || '');
  const [dateError, setDateError] = useState(''); // Error state for date validation

  // Check if actProps is populated
  const isActPropsPopulated = Object.values(actProps).every(
    prop => prop !== null && prop !== undefined
  );

  useEffect(() => {
    if (isUpdate && actuarial && !formData.actuarialLabel) {
      setFormData(prevFormData => ({
        ...prevFormData,
        actuarialLabel: actuarial.label,
        actuarialDescription: actuarial.description,
        startDateTimeUtc: new Date(actuarial.startDateTimeUtc).toISOString(),
        endDateTimeUtc: new Date(actuarial.endDateTimeUtc).toISOString(),
        actuarialType: actuarial.actuarialType
      }));
      setActuarialType(actuarial.actuarialType);
    } else {
      if (!formData.actuarialLabel) {
        setFormData(prevFormData => ({ ...prevFormData }));
      }
    }
  }, [isUpdate, actuarial, formData.actuarialLabel, setFormData]);

  const handleReturn = () => {
    history.push(`/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials`);
  };

  const handleActuarialLabelChange = e => {
    setFormData(prevFormData => ({
      ...prevFormData,
      actuarialLabel: e.target.value
    }));

    const isValid = ValidationRegex.label.test(e.target.value) && e.target.value.length < 30;
    setActuarialLabelError(!isValid);
  };

  const handleActuarialDescriptionChange = e => {
    setFormData(prevFormData => ({
      ...prevFormData,
      actuarialDescription: e.target.value
    }));

    const isValid = ValidationRegex.actuarialDesc.test(e.target.value) && e.target.value.length < 1000;
    setActuarialDescriptionError(!isValid);
  };

  const handleDateChange = (field, date) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: date.toISOString()
    }));

    validateDates();
  };

  const validateDates = () => {
    const startDate = new Date(formData.startDateTimeUtc);
    const endDate = new Date(formData.endDateTimeUtc);

    if (startDate >= endDate) {
      setDateError('Start date cannot be later than or equal to end date.');
    } else {
      setDateError('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    validateDates();

    if (!formData.actuarialLabel || !formData.actuarialDescription || dateError) {
      setActuarialLabelError(!formData.actuarialLabel);
      setActuarialDescriptionError(!formData.actuarialDescription);
      return;
    }

    nextStep();
  };

  const handleActuarialTypeChange = e => {
    setFormData(formData => ({
      ...formData,
      actuarialType: e.target.value
    }));
    setActuarialType(e.target.value);
  };

  const canSubmit = () => {
    return (
      !actuarialLabelError &&
      !actuarialDescriptionError &&
      actuarialType !== '' &&
      formData.actuarialDescription !== '' &&
      formData.actuarialLabel !== '' &&
      !dateError
    );
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <FormHeader variant="h3" title="Actuarial details" />
        <Typography>Please select the type of Actuarial you are creating:</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="Actuarial type"
              name="actuarial-type-radio"
              value={actuarialType}
              onChange={handleActuarialTypeChange}
            >
              <FormControlLabel value="UI" control={<Radio color="primary" />} label="UI" />
              <FormControlLabel value="Math" control={<Radio color="primary" />} label="Math" />
            </RadioGroup>
          </FormControl>
        </div>
        <Spacer height={2} />
        <Grid item xs={12} sm={12}>
          <Typography>Please input the exact label of your Actuarial to ensure a perfect match.</Typography>
          <Spacer height={0.5} />
        </Grid>
        <TextField
          margin="normal"
          type="text"
          value={formData.actuarialLabel || ''}
          onChange={handleActuarialLabelChange}
          label="Actuarial label"
          className={classes.textField}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          onBlur={() => setActuarialLabelTouched(true)}
          error={actuarialLabelTouched && actuarialLabelError}
          helperText={
            actuarialLabelTouched && actuarialLabelError
              ? 'No white spaces. More than one character. Less than 30 characters. Only lowercase characters and underscores.'
              : ''
          }
          InputProps={{
            endAdornment:
              actuarialLabelTouched && actuarialLabelError ? (
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
        <Typography>The Actuarial description is a brief summary. It should be clear and concise, and should not contain any special characters.</Typography>
        <Spacer height={2} />
        <TextField
          type="text"
          value={formData.actuarialDescription || ''}
          onChange={handleActuarialDescriptionChange}
          label="Actuarial description"
          className={classes.textField}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          multiline
          onBlur={() => setActuarialDescriptionTouched(true)}
          error={actuarialDescriptionTouched && actuarialDescriptionError}
          helperText={
            actuarialDescriptionTouched && actuarialDescriptionError
              ? 'Only less than 1000 characters allowed. Some special characters not allowed. Cannot be empty or just whitespace.'
              : ''
          }
          InputProps={{
            endAdornment:
              actuarialDescriptionTouched && actuarialDescriptionError ? (
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomDatePicker
              label="Start Date"
              value={new Date(formData.startDateTimeUtc)}
              onChange={date => handleDateChange('startDateTimeUtc', date)}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomDatePicker
              label="End Date"
              value={new Date(formData.endDateTimeUtc)}
              onChange={date => handleDateChange('endDateTimeUtc', date)}
            />
          </Grid>
        </Grid>
        {dateError && <Typography className={classes.errorMessage}>{dateError}</Typography>}
      </Paper>

      <div className={classes.buttonGroup}>
        <StepperButtons
          backButtonState={false}
          nextButtonState={false}
          showSubmitButton={false}
          form="actuarialDetailsForm" // Replace with the name of your form
          valid={canSubmit()}
          showNextButton={true}
          showCancelButton
          cancelFunc={handleReturn}
          backFunc={prevStep}
          nextFunc={handleSubmit}
          showBackButton={!((!isUpdate && isActPropsPopulated) || actuarial)}
        />
      </div>
    </form>
  );
};

export default ActuarialDetails;
